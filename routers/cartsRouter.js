const express = require('express');
const cartsRouter = express.Router();
const { getAllCarts, newCart, getMyCart, addProductToMyCart, deleteProductFromMyCart, updateMyCart, updateProductQuantity, deleteAllProductsFromMyCart, purchaseCart } = require("../controller/carts.controller")
const { authUser } = require("../middleware/authUser")

cartsRouter.get('', getAllCarts)
cartsRouter.post("", newCart)
cartsRouter.get("/:cId", getMyCart)
cartsRouter.post("/:cId/product/:pId", authUser, addProductToMyCart)
cartsRouter.delete("/:cId/products/:pId", deleteProductFromMyCart)
cartsRouter.put("/:cId", updateMyCart)
cartsRouter.put("/:cId/products/:pId", updateProductQuantity)
cartsRouter.delete("/:cId", deleteAllProductsFromMyCart)
cartsRouter.post("/:cId/purchase", purchaseCart)

module.exports = {
    cartsRouter
}