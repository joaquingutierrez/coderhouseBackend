const express = require('express');
const paymentsRouter = express.Router();
const { PaymentService } = require("../services/payments")

paymentsRouter.post('/payment-intents', async (req, res) => {
    const paymentIntentInfo = {
        amount: 30000,
        currency: "ars"
    }
    const service = new PaymentService()
    let result = await service.createPaymentIntent(paymentIntentInfo)
    console.log(result)
    res.send({ message: "success", payload: result })
})


module.exports = {
    paymentsRouter
}