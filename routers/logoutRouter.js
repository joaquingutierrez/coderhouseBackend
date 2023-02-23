const express = require('express');
const logoutRouter = express.Router();

logoutRouter.get("", function (req, res) {
    req.session.destroy()
    res.status(200).redirect("/login")
})

module.exports = {
    logoutRouter
}