const express = require('express');
const passport = require('passport');
const loginRouter = express.Router();
const { userModel } = require("../dao/mongoManager/models/users.model")
const { isValidPassword } = require("../utils")


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
        res.redirect("/api/session/current") :
        res.render("login")
})
/* loginRouter.post("", async function (req, res) {
    const { email, password } = req.body
    let user
    if (email === coderAdmin.email && password === coderAdmin.password) {
        user = coderAdmin
    } else {
        user = await userModel.findOne({email})
    }
    try {
        if (await isValidPassword(password, user)) {
            req.session.user = user
            res.status(200).json({message: "success", data: user})
        } else {
            res.status(404).json({message: "error", data: "Usuario no encontrado"})
        }
    } catch(error) {
        res.status(500).json({error: error.message})
    }
}) */


loginRouter.post("", passport.authenticate("login", { failureRedirect: "/login/faillogin" }), async (req, res) => {
    if (!req.user) return res.status(400).send({ status: "error", error: "Invalid credentials" })
    req.session.user = {
        rol: req.user.rol,
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email
    }
    res.status(200).json({message: "success", data: req.user})
})

loginRouter.get("/faillogin", async (req, res) => {
    console.log("Failed Strategy")
    res.send({ error: "Failed" })
})


//Login con Github

loginRouter.get('/github', passport.authenticate('github', {scope:['user:email']}), (req, res)=>{})

// Login  exitoso.
loginRouter.get('/githubcallback', passport.authenticate('github', {failureRedirect:'/login'}), (req, res)=>{
    req.session.user = req.user;
    res.redirect('/api/products');
})



module.exports = {
    loginRouter
}