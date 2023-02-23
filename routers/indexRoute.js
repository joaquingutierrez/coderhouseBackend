const express = require('express');
const indexRouter = express.Router();


indexRouter.get('', function (req, res) {
    res.redirect("/login")
})




module.exports = {
        indexRouter
    }