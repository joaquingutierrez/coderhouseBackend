const express = require('express');
const productsRouter = express.Router();
const { getAllProducts, getMyProduct, newProduct, deleteMyProduct, updateMyProduct } = require("../controller/products.controller")
const { auth, createProductAuth } = require("../middleware/auth")

productsRouter.get('', getAllProducts)
productsRouter.get('/:pId', getMyProduct)
productsRouter.post('', createProductAuth, newProduct)
productsRouter.delete("/:pId", auth, deleteMyProduct)
productsRouter.put("/:pId", auth, updateMyProduct)


module.exports = {
    productsRouter
}