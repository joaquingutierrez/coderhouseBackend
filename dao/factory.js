require('dotenv').config()

let persistence = process.env.PERSISTENCE

console.log(persistence);

switch (persistence) {
    case "MONGO":
        const { default: mongoose } = require('mongoose')
        mongoose.connect(`mongodb+srv://${process.env.USER_MONGO}:${process.env.PASSWORD_MONGO}@cluster0.i34mf4h.mongodb.net/${process.env.DB_MONGO}?retryWrites=true&w=majority`, (err) => {
            if (err) {
                console.log("Error al conectarse a la Base de Datos", err);
            } else {
                console.log("Conectado con exito a la base de datos");
            }
        })
        var { productsList } = require("./mongoManager/ProductManager.js")
        var { cartsList } = require("./mongoManager/CartManager.js")
        var { initializePassport } = require('../config/passport.config')
        break

    case "FS":
        var { productsList } = require("./fsManager/ProductManager.js")
        var { cartsList } = require("./fsManager/CartManager")
        var { initializePassport } = require('../config/passport_fs.config')
        break
}


module.exports = {
    productsList,
    cartsList,
    initializePassport
}