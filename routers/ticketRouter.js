const express = require('express');
const ticketRouter = express.Router();
const { getTicket } = require("../controller/ticket.controller")

ticketRouter.get("/:codeTicket", getTicket)

module.exports = {
    ticketRouter
}