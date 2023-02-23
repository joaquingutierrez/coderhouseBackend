const express = require('express');
const loginRouter = express.Router();
const {userModel} = require("../dao/mongoManager/models/users.model")


const coderAdmin = {
    first_name: "Coder",
    last_name: "House",
    email: "adminCoder@coder.com",
    password: "adminCod3r123",
    rol: "Admin",
    age: 0
}



loginRouter.get("", function (req, res) {
    req.session.user ? 
    res.redirect("/profile") :
    res.render("login")
})
loginRouter.post("", async function (req, res) {
    const { email, password } = req.body
    let user
    if (email === coderAdmin.email && password === coderAdmin.password) {
        user = coderAdmin
    } else {
        user = await userModel.findOne({email, password})
    }
    try {
        if (user) {
            req.session.user = user
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