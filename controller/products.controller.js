const { productsModel } = require('../dao/mongoManager/models/products.model');
const { productsList } = require("../dao/mongoManager/ProductManager")
const {stringHTMLProducts} = require("../routers/productsRouter")

const getAllProducts = async function (request, response) {

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
        const productsRenderList = stringHTMLProducts(products)
        const productsResponseJSON = JSON.stringify(productsResponse)
        if (page <= productsResponse.totalPages && page >= 1 || page === undefined) {
            const user = request.session.user
            const usersButtonsLoginSignup = `
            <a href="/login"><button id="loginProfile">Login</button></a>
            <a href="/signup"><button id="signup">Signup</button></a>
            `
            const usersButtonsProfileLogout = `
            <a href="/api/session/current"><button id="loginProfile">Profile</button></a>
            <a href="/logout"><button id="signup">Logout</button></a>
            `
            if (user) {
                response.render("home", {
                    productsRenderList,
                    productsResponseJSON,
                    user,
                    usersButtonsProfileLogout
                })
            } else {
                response.render("home", {
                    productsRenderList,
                    productsResponseJSON,
                    usersButtonsLoginSignup
                })
            }
        } else {
            response.status(400).send("Pagina no encontrada")
        }
    }
    catch {
        console.log("Error");
    }
}

const getMyProduct = async function (req, res) {
    const { pId } = req.params;
    const productId = await productsList.getProductById(pId)
    const { title, description, price, thumbnail, stock, category } = productId[0]
    res.render("product", { title, description, price, thumbnail, stock, category })
}

const newProduct = async function (req, res) {
    const newProduct = await req.body;
    productsList.addProduct(newProduct)
    res.send('Producto agregado satisfactoriamente')
}

const deleteMyProduct = function (req, res) {
    const productId = req.params.pId;
    productsList.deleteProduct(productId)
    res.send(`Producto con id: ${productId} eliminado satisfactoriamente`)
}

const updateMyProduct = function (req, res) {
    const productId = req.params.pId;
    const product = req.body;
    productsList.updateProduct(productId, product)
    res.send(`Producto con id: ${productId} modificado con exito`)
}

module.exports = {
    getAllProducts,
    getMyProduct,
    newProduct,
    deleteMyProduct,
    updateMyProduct
}