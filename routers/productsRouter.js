const express = require('express');
const { productsModel } = require('../dao/mongoManager/models/products.model');
const productsRouter = express.Router();
const { productsList } = require("../dao/mongoManager/ProductManager")

const stringHTMLProducts = (products) => {
    let productsRenderList = ""
    products.map(item => {
        productsRenderList += `
            <div class="card">
                <h3>title: ${item.title}</h3>
                <p>description: ${item.description}</p>
                <h3>price: ${item.price}</h3>
                <h4>code: ${item.code}</h4>
                <h4>category: ${item.category}</h4>
            </div>
        `
    })
    return productsRenderList
}


productsRouter.get('', async function (request, response) {

    const {limit, page, sort, category} = request.query
    let productsResponse
    try {
        if (category) {
            productsResponse = await productsModel.paginate(
                {category: category},
                {page: page || 1, limit: limit || 10, sort:{price: sort || null}}
            )
        }
        else {
            productsResponse = await productsModel.paginate(
                {},
                {page: page || 1, limit: limit || 10, sort:{price: sort || null}}
            )
        }
        const products = productsResponse.docs
        const productsRenderList = stringHTMLProducts(products)
        const productsResponseJSON = JSON.stringify(productsResponse)
        response.render("home", { 
            productsRenderList,
            productsResponseJSON 
        })
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