const mongoose = require("mongoose")

const productsCollection = "products"

const productsSchema = new mongoose.Schema({
    title: String,
    description: String,
    code: {
        type: String,
        unique: true
    },
    price: Number,
    thumbnail: Array,
    stock: Number,
    category: String,
    status: Boolean
})

const productsModel = mongoose.model(productsCollection, productsSchema)

module.exports = {
    productsModel
}