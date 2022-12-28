const { testList } = require("./ProductManager")
const express = require('express')
const app = express()

app.get('/', function (req, res) {
    res.send('Bienvenidos')
})
app.get('/products', async function (request, response) {
    const { limit } = request.query;
    if (limit) {
        const productsLimit = await testList.getProducts().splice(0, limit)
        response.send(productsLimit)
    } else {
        const products = await testList.getProducts()
        response.send(products)
    }
})
app.get('/products/:pId', async function (req, res) {
    const { pId } = req.params;
    const productId = await testList.getProductById(parseInt(pId))
    res.send(productId)
})

app.listen(8080)