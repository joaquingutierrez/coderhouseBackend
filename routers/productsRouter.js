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
                <a href="/api/products/${item._id}"><button>Más detalles</button><a>
                <h4>category: ${item.stock}</h4>
            </div>
        `
    })
    return productsRenderList
}


productsRouter.get('', async function (request, response) {

    const { limit, page, sort, category, stock } = request.query
    let productsResponse
    let query = {}
    if (sort) {
        query.sort = { price: sort }
    }
    query.page = page || 1
    query.limit = limit || 10
    let filter = {}
    if (category) {
        filter.category = category
    }
    if (stock > 0) {
        filter.stock = { $gte: stock }
    } else if (parseInt(stock) === 0) {
        filter.stock = 0
    }
    try {
        productsResponse = await productsModel.paginate(
            filter,
            query
        )
        const products = productsResponse.docs
        console.log(page);
        const productsRenderList = stringHTMLProducts(products)
        const productsResponseJSON = JSON.stringify(productsResponse)
        if (page <= productsResponse.totalPages && page >= 1 || page === undefined) {
            response.render("home", {
                productsRenderList,
                productsResponseJSON
            })
        } else {
            response.status(400).send("Pagina no encontrada")
        }
    }
    catch {
        console.log("Error");
    }
})

productsRouter.get('/:pId', async function (req, res) {
    const { pId } = req.params;
    const productId = await productsList.getProductById(pId)
    const { title, description, price, thumbnail, stock, category } = productId[0]
    res.render("product", { title, description, price, thumbnail, stock, category })
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