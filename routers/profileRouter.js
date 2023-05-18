const express = require('express');
const profileRouter = express.Router();
const {profile, getProfile} = require("../controller/profile.controller")

profileRouter.get("", profile)
profileRouter.get("/getProfile", getProfile)

module.exports = {
    profileRouter
}