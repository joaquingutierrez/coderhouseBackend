const mongoose = require("mongoose")

const messagesCollection = "messages"

const messagesSchema = new mongoose.Schema({
    user: String,
    message: String
})

const messagesModel = mongoose.model(messagesCollection, messagesSchema)

module.exports = {
    messagesModel
}