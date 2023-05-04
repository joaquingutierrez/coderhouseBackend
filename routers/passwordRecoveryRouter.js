const express = require('express');
const passwordRecoveryRouter = express.Router();
const {inputEmail, sendRecoveryEmail, inputPassword, changePassword} = require("../controller/passwordRecovery.controller")

passwordRecoveryRouter.get('', inputEmail)
passwordRecoveryRouter.post("", sendRecoveryEmail)
passwordRecoveryRouter.get("/change-password/:token", inputPassword)
passwordRecoveryRouter.put("/change-password/:token", changePassword)



module.exports = {
    passwordRecoveryRouter
}