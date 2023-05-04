const express = require('express');
const mailRouter = express.Router();
const {sendEmail} = require("../controller/mail.controller")

mailRouter.get("", sendEmail)

module.exports = {
    mailRouter
}