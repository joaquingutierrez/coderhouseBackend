const mongoose = require("mongoose")
const mongoosePaginate = require("mongoose-paginate-v2")

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
productsSchema.plugin(mongoosePaginate)

const productsModel = mongoose.model(productsCollection, productsSchema)

module.exports = {
    productsModel
}