const express = require('express');
const cartsRouter = express.Router();
const { getAllCarts, newCart, getMyCart, addProductToMyCart, deleteProductFromMyCart, updateMyCart, updateProductQuantity, deleteAllProductsFromMyCart, purchaseCart } = require("../controller/carts.controller")


cartsRouter.get('', getAllCarts)
cartsRouter.post("", newCart)
cartsRouter.get("/:cId", getMyCart)
cartsRouter.post("/:cId/product/:pId", addProductToMyCart)
cartsRouter.delete("/:cId/products/:pId", deleteProductFromMyCart)
cartsRouter.put("/:cId", updateMyCart)
cartsRouter.put("/:cId/products/:pId", updateProductQuantity)
cartsRouter.delete("/:cId", deleteAllProductsFromMyCart)
cartsRouter.post("/:cId/purchase", purchaseCart)

module.exports = {
    cartsRouter
}