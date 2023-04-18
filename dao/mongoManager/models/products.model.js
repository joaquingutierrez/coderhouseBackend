const mongoose = require("mongoose")
const mongoosePaginate = require("mongoose-paginate-v2")

const productsCollection = "products"

const productsSchema = new mongoose.Schema({
    title: {
        type:String,
        require:true
    },
    description: {
        type:String,
        require:true
    },
    code: {
        type: String,
        unique: true
    },
    price: {
        type:Number,
        require:true
    },
    thumbnail: {
        type: Array,
        require:true
    },
    stock: {
        type: Number,
        require:true
    },
    category: {
        type:String,
        require:true
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