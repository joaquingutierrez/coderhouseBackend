const express = require('express');
const cartsRouter = express.Router();
const { cartsList } = require("../dao/mongoManager/CartManager")

cartsRouter.get('', async (req, res) => {
    try {
        const carts = await cartsList.getCarts()
        res.send(carts)
    }
    catch (err) {
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
    const { quantity } = await req.body;
    cartsList.addProduct(cId, pId, quantity);
    const cart = cartsList.getCart(cId)
    res.send(cart)
})
cartsRouter.delete("/:cId/products/:pId", async function (req, res) {
    //deberá eliminar del carrito el producto seleccionado.
    const { cId, pId } = req.params
    cartsList.deleteProduct(cId, pId)
    const cart = await cartsList.getCart(cId)
    res.send(cart)
})
cartsRouter.put("/:cId", async function (req, res) {
    //deberá actualizar el carrito con un arreglo de productos con el formato especificado arriba.
    const { cId } = req.params
    const newCart = await req.body
    await cartsList.newCart(cId, newCart)
    res.send("Carrito actualizado")
})
cartsRouter.put("/:cId/products/:pId", async function (req, res) {
    //deberá poder actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body
    const { cId, pId } = req.params
    const { newQuantity } = req.body
    cartsList.newProductQuantity(cId, pId, newQuantity)
    res.send("Cantidad actualizada")
})
cartsRouter.delete("/:cId", async function (req, res) {
    //deberá eliminar todos los productos del carrito 
    const { cId } = req.params
    await cartsList.newCart(cId, [])
    res.send("Productos borrados con éxito")
})

module.exports = {
    cartsRouter
}