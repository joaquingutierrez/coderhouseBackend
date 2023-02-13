const express = require('express');
const { productsModel } = require('../dao/mongoManager/models/products.model');
const productsRouter = express.Router();
const { productsList } = require("../dao/mongoManager/ProductManager")

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

    try {
        const productsResponse = await productsModel.paginate(
            {},
            {page: 1, limit: 3}
        )
        const products = productsResponse.docs
        const productsRenderList = stringHTMLProducts(products)
        response.render("home", { productsRenderList })
    }
    catch {
        console.log("Error");
    }
})

productsRouter.get('/:pId', async function (req, res) {
    const { pId } = req.params;
    const productId = await productsList.getProductById(pId)
    res.send(productId)
})

productsRouter.post('', async function (req, res) {
    const newProduct = await req.body;
    productsList.addProduct(newProduct)
    res.send('Producto agregado satisfactoriamente')
})
productsRouter.delete("/:pId", function (req, res) {
    const productId = req.params.pId;
    productsList.deleteProduct(productId)
    res.send(`Producto con id: ${productId} eliminado satisfactoriamente`)
})
productsRouter.put("/:pId", function (req, res) {
    const productId = req.params.pId;
    const product = req.body;
    productsList.updateProduct(productId, product)
    res.send(`Producto con id: ${productId} modificado con exito`)
})


module.exports = {
    productsRouter,
    stringHTMLProducts
}