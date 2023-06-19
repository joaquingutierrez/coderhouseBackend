const express = require('express');
const { cartsList } = require('../dao/factory');
const { ticketsModel } = require('../dao/mongoManager/models/ticket.model');
const successPaymentRouter = express.Router();
const crypto = require("crypto")



successPaymentRouter.get("", async (req, res) => {
    const cId = await req.session.user.cart
    const amount = await cartsList.purchase(cId)
    if (amount > 0) {
        const ticketCode = crypto.randomBytes(20).toString('hex')
        await ticketsModel.create({
            code: ticketCode,
            amount,
            purchaser: req.session.user.email
        })
        res.redirect("/api/ticket/" + ticketCode)
    } else {
        res.send({ message: "error" })
    }
})

module.exports = {
    successPaymentRouter
}