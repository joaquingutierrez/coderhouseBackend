const express = require('express');
const productsRouter = express.Router();
const { getAllProducts, getMyProduct, newProduct, deleteMyProduct, updateMyProduct } = require("../controller/products.controller")
const { auth, premiumAdminAuth } = require("../middleware/auth")

productsRouter.get('', getAllProducts)
productsRouter.get('/:pId', getMyProduct)
productsRouter.post('', premiumAdminAuth, newProduct)
productsRouter.delete("/:pId", premiumAdminAuth, deleteMyProduct)
productsRouter.put("/:pId", premiumAdminAuth, updateMyProduct)


module.exports = {
    productsRouter
}