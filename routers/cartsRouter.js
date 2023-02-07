const express = require('express');
const cartsRouter = express.Router();
const { cartsList } = require("../dao/mongoManager/CartManager")

cartsRouter.get('', async (req, res) => {
    try {
        const carts = await cartsList.getCarts()
        res.send(carts)
    }
    catch (err){
        throw err
    }
})

cartsRouter.post("", async function (req, res) {
    try {
        await cartsList.addCart()
        res.send("Carrito agregado")
    }
    catch (err) {
        throw err
    }
})

cartsRouter.get("/:cId", async function (req, res) {
    const cId = req.params.cId;
    const cart = await cartsList.getCart(cId)
    res.send(cart.products)
})
cartsRouter.post("/:cId/product/:pId", async function (req, res) {
    const { cId, pId } = req.params;
    const {quantity} = await req.body;
    cartsList.addProduct(cId, pId, quantity);
    const cart = cartsList.getCart(cId)
    res.send(cart)
})

module.exports = {
    cartsRouter
}