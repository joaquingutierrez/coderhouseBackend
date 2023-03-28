const express = require('express');
const profileRouter = express.Router();
const {profile} = require("../controller/profile.controller")

profileRouter.get("", profile)

module.exports = {
    profileRouter
}