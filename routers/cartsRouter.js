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
cartsRouter.delete("/:cid/products/:pid", async function (req,res) {
    //deberá eliminar del carrito el producto seleccionado.
})
cartsRouter.put("/:cid", async function (req,res) {
    //deberá actualizar el carrito con un arreglo de productos con el formato especificado arriba.
})
cartsRouter.put("/:cid/products/:pid ", async function (req,res) {
    //deberá poder actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body
})
cartsRouter.delete("/:cid", async function (req, res) {
    //deberá eliminar todos los productos del carrito 
})

module.exports = {
    cartsRouter
}