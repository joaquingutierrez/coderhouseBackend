const express = require('express');
const paymentsRouter = express.Router();
const { PaymentService } = require("../services/payments");
const { cartsList } = require('../dao/factory');
require("dotenv").config()


paymentsRouter.post('/payment-intents', async (req, res) => {
    const cId = req.session.user.cart
    let stockValidation = await cartsList.stockValidation(cId)
    if (stockValidation) {
        let totalAmount = await cartsList.getTotal(cId)
        totalAmount = totalAmount * 100
        const service = new PaymentService()
        const session = await service.stripe.checkout.sessions.create({
            line_items: [{
                price_data: {
                    product_data: {
                        name: "Carrito",
                    },
                    currency: "usd",
                    unit_amount: totalAmount,
                },
                quantity: 1,
            },],
            mode: "payment",
            success_url: process.env.URL + "/success",
            cancel_url: process.env.URL + "/cancel",
        });
    
    
        return res.send({ message: "success", payload: session })
    }
    res.send({message: "error"})
});

module.exports = {
    paymentsRouter
}