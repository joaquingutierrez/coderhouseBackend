const express = require('express');
const chatRouter = express.Router();
const { renderChat } = require("../controller/chat.controller")
const {authUser} = require("../middleware/authUser")

chatRouter.get('', authUser, renderChat)

module.exports = {
    chatRouter
}