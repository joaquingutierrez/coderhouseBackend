const express = require('express');
const passport = require('passport');
const signupRouter = express.Router();
const { userModel } = require('../dao/mongoManager/models/users.model');
const { passwordHash } = require("../utils")

signupRouter.get("", function (req, res) {
    res.render("signup")
})
/* signupRouter.post("", async function (req, res) {
    const { first_name, last_name, age, email } = req.body
    let password = req.body.password
    const rol = "User"
    try {
        password = await passwordHash(password)
        const newUser = await userModel.create({ first_name, last_name, age, email, password, rol })
        res.status(201).json({ message: "success", data: newUser })
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}) */

signupRouter.post("", passport.authenticate("register", {failureRedirect: "/signup/failregister"}), async (req,res) => {
    res.status(201).json({ message: "success" })
})

signupRouter.get("/failregister", async (req, res) => {
    console.log("Failed Strategy")
    res.send({error: "Failed"})
})

module.exports = {
    signupRouter
}