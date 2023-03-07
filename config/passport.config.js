const passport = require("passport")
const local = require("passport-local")
const GitHubStrategy = require("passport-github2")
const { userModel } = require('../dao/mongoManager/models/users.model');
const { passwordHash, isValidPassword } = require("../utils")
require('dotenv').config()

const LocalStrategy = local.Strategy
const initializePassport = () => {

    passport.use("register", new LocalStrategy(
        { passReqToCallback: true, usernameField: "email" }, async (req, username, password, done) => {
            const { first_name, last_name, age, email } = req.body
            try {
                let user = await userModel.findOne({ email: username })
                if (user) {
                    console.log("User already exists")
                    return done(null, false)
                }
                const newUser = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: await passwordHash(password)
                }
                let result = await userModel.create(newUser)
                return done(null, result)
            }
            catch (err) {
                return done("Error al intentar obtener al usuario: ", err)

            }
        }
    ))

    passport.use("login", new LocalStrategy(
        { usernameField: "email" }, async (username, password, done) => {
            try {
                const user = await userModel.findOne({ email: username })
                if (!user) {
                    console.log("User doesn't exist")
                    return done(null, false)
                }
                if (!(await isValidPassword(password, user))) return done(null, false)
                return done(null, user)
            }
            catch (err) {
                return done(err)
            }
        }
    ))
    passport.use('github', new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACKURL
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await userModel.findOne({ email: profile._json.email })
            if (!user) {
                let newUser = {
                    rol: "User GitHub",
                    first_name: profile._json.name,
                    last_name: '',
                    email: profile._json.email,
                    password: '',
                    age: 0,
                }
                let result = await userModel.create(newUser)
                done(null, result)
            } else {
                done(null, user)
            }
        } catch (error) {
            return done("Error en estrategia de login: " + error)
        }
    }
    ))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })
    passport.deserializeUser(async (id, done) => {
        let user = await userModel.findById(id)
        done(null, user)
    })

}


module.exports = {
    initializePassport
}
