const mongoose = require("mongoose")

const userCollection = "users";

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true,
    },
    password: String,
    age: Number,
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "carts"
    },
    rol: {
        type: String,
        default: "user"
    }
});

const userModel = mongoose.model(userCollection, userSchema);

module.exports = {
    userModel
}