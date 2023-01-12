const express = require('express');
const productsRouter = express.Router();
const { testList } = require("../ProductManager")

productsRouter.get('', async function (request, response) {
    const { limit } = request.query;
    if (limit) {
        const productsLimit = await testList.getProducts().splice(0, limit)
        response.send(productsLimit)
    } else {
        const products = await testList.getProducts()
        response.send(products)
    }
})
productsRouter.get('/:pId', async function (req, res) {
    const { pId } = req.params;
    const productId = await testList.getProductById(parseInt(pId))
    res.send(productId)
})
productsRouter.post('', async function (req, res) {
    const newProduct = await req.body;
    testList.addProduct(newProduct)
    res.send('Producto agregado satisfactoriamente')
})
productsRouter.delete("/:pId", function (req, res) {
    const productId = parseInt(req.params.pId);
    testList.deleteProduct(productId)
    res.send(`Producto con id: ${productId} eliminado satisfactoriamente`)
})
productsRouter.put("/:pId", function (req, res) {
    const productId = parseInt(req.params.pId);
    const { property, value } = req.body;
    testList.updateProduct(productId, property, value)
    res.send(`Producto con id: ${productId} modificado con exito`)
})


module.exports = {
    productsRouter
}