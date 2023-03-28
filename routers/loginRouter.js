const express = require('express');
const passport = require('passport');
const loginRouter = express.Router();
const { redirectIfLogin, login, failLogin, loginGitHubSuccess } = require("../controller/login.controller")


loginRouter.get("", redirectIfLogin)
loginRouter.post("", login)
loginRouter.get("/faillogin", failLogin)

//Login con Github
loginRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }), (req, res) => { })

// Login  exitoso con GitHub.
loginRouter.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), loginGitHubSuccess)


module.exports = {
    loginRouter
}