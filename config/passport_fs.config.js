const passport = require("passport")
const local = require("passport-local")
const GitHubStrategy = require("passport-github2")
const { passwordHash, isValidPassword } = require("../utils")
require('dotenv').config()
const { userList } = require("../dao/fsManager/UserManager")

const LocalStrategy = local.Strategy
const initializePassport = () => {

    passport.use("register", new LocalStrategy(
        { passReqToCallback: true, usernameField: "email" }, async (req, username, password, done) => {
            const { first_name, last_name, age, email } = req.body
            try {
                let user = await userList.getUserByEmail({ email: username })
                if (user !== undefined) {
                    req.logger.warn("User already exists")
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
                let result = userList.addUser(newUser)
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
                if ((username == process.env.ADMIN_EMAIL) && (password == process.env.ADMIN_PASSWORD)) {
                    const user = {
                        id: "ADMIN_0000",
                        email: "Secreto",
                        rol: "ADMIN",
                        first_name: "Coder",
                        last_name: "Admin",
                        age: 0
                    }
                    return done(null, user)
                }
                let user = await userList.getUserByEmail(username)
                if (user === undefined) {
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
            let user = await userList.getUserByEmail(profile._json.email)
            if (user === undefined) {
                let newUser = {
                    first_name: profile._json.name,
                    last_name: '***',
                    email: profile._json.email,
                    password: '***',
                    age: 1,
                }
                let result = userList.addUser(newUser)
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
        done(null, user.id)
    })
    passport.deserializeUser(async (id, done) => {
        let user = await userList.findById(id)
        done(null, user)
    })

}


module.exports = {
    initializePassport
}
