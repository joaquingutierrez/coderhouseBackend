const express = require('express');
const cartsRouter = express.Router();
const { cartsList } = require("../dao/fsManager/CartManager")

cartsRouter.get('', (req, res) => {
    res.send('hola Mundo')
})
cartsRouter.post("", function (req, res) {
    cartsList.addCart()
    res.send("todo ok")
})
cartsRouter.get("/:cId", async function (req, res) {
    const cId = parseInt(req.params.cId);
    const cart = await cartsList.getCart(cId)
    res.send(cart.products)
})
cartsRouter.post("/:cId/product/:pId", async function (req, res) {
    const { cId, pId } = req.params;
    const {quantity} = await req.body;
    cartsList.addProduct(parseInt(cId), parseInt(pId), quantity);
    const cart = cartsList.getCart(cId)
    res.send(cart)
})

module.exports = {
    cartsRouter
}