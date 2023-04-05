const mongoose = require("mongoose")

const ticketsCollection = "tickets"

const ticketsSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true
    },
    purchase_datetime: {
        type: Date,
        default: Date()
    },
    amount: Number,
    purchaser: String
})

const ticketsModel = mongoose.model(ticketsCollection, ticketsSchema)

module.exports = {
    ticketsModel
}