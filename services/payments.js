const Stripe = require("stripe")
require("dotenv").config()

class PaymentService {
    constructor() {
        this.stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY)
    }
    createPaymentIntent = async (data) => {
        const paymentIntent = await this.stripe.paymentIntents.create(data)
        return paymentIntent
    }
}

module.exports = {
    PaymentService
}