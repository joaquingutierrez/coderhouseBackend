const express = require('express');
const profileRouter = express.Router();

profileRouter.get("", function (req, res) {
    const user = req.session.user
    res.render("profile", { user })
})

module.exports = {
    profileRouter
}