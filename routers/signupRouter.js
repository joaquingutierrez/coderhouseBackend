const express = require('express');
const signupRouter = express.Router();
const { userModel } = require('../dao/mongoManager/models/users.model');

signupRouter.get("", function (req, res) {
    res.render("signup")
})
signupRouter.post("", async function (req, res) {
    const { first_name, last_name, age, email, password } = req.body
    try {
        const newUser = await userModel.create({first_name, last_name, age, email, password})
        res.status(201).json({message: "success", data: newUser})
    }
    catch (err) {
        res.status(500).json({error: err.message})
    }
})

module.exports = {
    signupRouter
}