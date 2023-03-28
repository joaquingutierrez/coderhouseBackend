const express = require('express');
const chatRouter = express.Router();
const {renderChat} = require("../controller/chat.controller")


chatRouter.get('', renderChat)

module.exports = {
    chatRouter
}