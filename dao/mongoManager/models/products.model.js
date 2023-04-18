const mongoose = require("mongoose")
const mongoosePaginate = require("mongoose-paginate-v2")

const productsCollection = "products"

const productsSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true
    },
    description: {
        type:String,
        required:true
    },
    code: {
        type: String,
        unique: true
    },
    price: {
        type:Number,
        required:true
    },
    thumbnail: {
        type: Array,
        required:true
    },
    stock: {
        type: Number,
        required:true
    },
    category: {
        type:String,
        required:true
    },
    status: {
        type:String,
        default:true
    }
})
productsSchema.plugin(mongoosePaginate)

const productsModel = mongoose.model(productsCollection, productsSchema)

module.exports = {
    productsModel
}