const express = require('express');
const productsRouter = express.Router();
const { getAllProducts, getMyProduct, newProduct, deleteMyProduct, updateMyProduct } = require("../controller/products.controller")

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
                <a href="/api/products/${item._id}"><button>Más detalles</button><a>
                <h4>category: ${item.stock}</h4>
            </div>
        `
    })
    return productsRenderList
}

productsRouter.get('', getAllProducts)
productsRouter.get('/:pId', getMyProduct)
productsRouter.post('', newProduct)
productsRouter.delete("/:pId", deleteMyProduct)
productsRouter.put("/:pId", updateMyProduct)


module.exports = {
    productsRouter,
    stringHTMLProducts
}