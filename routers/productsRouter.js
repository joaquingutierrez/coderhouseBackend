const express = require('express');
const productsRouter = express.Router();
const { testList } = require("../dao/fsManager/ProductManager")
const { Server } = require('socket.io')

const stringHTMLProducts = (products) => {
    let productsRenderList = ""
    products.map(item => {
        productsRenderList += `
            <li>
                <h3>title: ${item.title}</h3>
                <p>description: ${item.description}</p>
                <h3>price: ${item.price}</h3>
                <h4>code: ${item.code}</h4>
            </li>
        `
    })
    return productsRenderList
}


productsRouter.get('', async function (request, response) {
    const { limit } = request.query;
    if (limit) {
        const productsLimit = await testList.getProducts().splice(0, limit)
        const productsRenderList = stringHTMLProducts(productsLimit)
        response.render("home", { productsRenderList })
    } else {
        const products = await testList.getProducts()
        const productsRenderList = stringHTMLProducts(products)
        response.render("home", { productsRenderList })
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
    productsRouter,
    stringHTMLProducts
}