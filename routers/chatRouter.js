const express = require('express');
const chatRouter = express.Router();


chatRouter.get('', async (req, res) => {
    res.render("chat", { title: "Chat" })
})

module.exports = {
    chatRouter
}