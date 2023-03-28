const express = require('express');
const indexRouter = express.Router();
const {redirectToLogin} = require("../controller/index.controller")


indexRouter.get('', redirectToLogin)




module.exports = {
        indexRouter
    }