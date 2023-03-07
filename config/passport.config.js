const passport = require("passport")
const local = require("passport-local")
const { userModel } = require('../dao/mongoManager/models/users.model');
const { passwordHash, isValidPassword } = require("../utils")

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
