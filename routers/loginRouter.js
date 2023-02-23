const express = require('express');
const loginRouter = express.Router();
const {userModel} = require("../dao/mongoManager/models/users.model")

loginRouter.get("", function (req, res) {
    req.session.user ? 
    res.redirect("/profile") :
    res.render("login")
})
loginRouter.post("", async function (req, res) {
    const { email, password } = req.body
    try {
        const user = await userModel.findOne({email, password})
        if (user) {
            req.session.user = user
            console.log(req.session.user)
            res.status(200).json({message: "success", data: user})
        } else {
            res.status(404).json({message: "error", data: "Usuario no encontrado"})
        }
    } catch(error) {
        res.status(500).json({error: error.message})
    }
})

module.exports = {
    loginRouter
}