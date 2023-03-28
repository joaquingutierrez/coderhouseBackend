const express = require('express');
const passport = require('passport');
const signupRouter = express.Router();
const { renderSingup, register, failRegister } = require("../controller/singup.controller")

signupRouter.get("", renderSingup)


signupRouter.post("", passport.authenticate("register", { failureRedirect: "/signup/failregister" }), register)

signupRouter.get("/failregister", failRegister)

module.exports = {
    signupRouter
}