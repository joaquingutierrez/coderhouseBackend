const express = require('express');
const paymentsRouter = express.Router();
const { PaymentService } = require("../services/payments");
const { cartsList } = require('../dao/factory');
require("dotenv").config()


paymentsRouter.post('/payment-intents', async (req, res) => {
    const cId = req.session.user.cart
    let totalAmount = await cartsList.purchase(cId)
    totalAmount = totalAmount * 100
    const paymentInfo = {
        currency: 'ars',
        amount: totalAmount,
    }
    const service = new PaymentService()
    const result = await service.createPaymentIntent(paymentInfo)
    console.log(result)
    res.send({message: "success", payload: result})
});

module.exports = {
    paymentsRouter
}


