const { productsList } = require("../dao/factory");
const { CustomError } = require("../services/errors/CustomError");
const { EErrors } = require("../services/errors/enum");
const { generateProductErrorInfo } = require("../services/errors/info")
const {sendEmailOfConfirmationProductDelete} = require("../utils/sendEmail")
require('dotenv').config()

if (process.env.PERSISTENCE === "MONGO") {
    var { productsModel } = require('../dao/mongoManager/models/products.model');
}

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
                <h4>Stock: ${item.stock}</h4>
            </div>
        `
    })
    return productsRenderList
}


const getAllProducts = async (request, response) => {

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
    if (process.env.PERSISTENCE === "MONGO") {

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
                        style: "/css/productsHome.css",
                        productsRenderList,
                        productsResponseJSON,
                        user,
                        usersButtonsProfileLogout
                    })
                } else {
                    response.render("home", {
                        style: "/css/productsHome.css",
                        productsRenderList,
                        productsResponseJSON,
                        usersButtonsLoginSignup
                    })
                }
            } else {
                response.status(400).send("Pagina no encontrada")
            }
        }
        catch (err) {
            request.logger.error(err)
            console.log("Error", err);
        }
    } else {
        const products = productsList.getProducts()
        const productsRenderList = stringHTMLProducts(products)
        const productsResponseJSON = JSON.stringify(productsResponse)
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
    }
}

const getMyProduct = async (req, res) => {
    const { pId } = req.params;
    const productId = await productsList.getProductById(pId)
    const cartId = req.session.user.cart
    const { title, description, price, thumbnail, stock, category, id } = productId[0]
    res.render("product", { style: "/css/productDetail.css", title, description, price, thumbnail, stock, category, id, cartId })
}

const newProduct = async (req, res, next) => {
    try {
        const newProduct = await req.body;
        if (req.session.user.rol === "PREMIUM") newProduct.owner = req.session.user.email
        if (!newProduct.title || !newProduct.description || !newProduct.code || !newProduct.price || !newProduct.stock || !newProduct.category) {
            CustomError.createError({
                name: "ProductError",
                cause: generateProductErrorInfo(newProduct),
                message: "Error trying to create the product",
                code: EErrors.INVALID_TYPES_ERROR
            })
        }
        const response = await productsList.addProduct(newProduct)
        res.send(response)
    } catch {
        next()
    }
}

const deleteMyProduct = async (req, res) => {
    const productId = req.params.pId;

    const productBefore = await productsList.getProductById(productId)
    if (productBefore[0]?.owner === req.session.user.email || req.session.user.rol === "ADMIN") {
        productsList.deleteProduct(productId)
        if (productBefore[0]?.owner) {
            sendEmailOfConfirmationProductDelete(productBefore[0].owner, productBefore[0])
        }
        res.send(`Producto con id: ${productId} eliminado satisfactoriamente`)
    } else {
        res.send("Usuario no autorizado")
    }
}

const updateMyProduct = async (req, res) => {
    const productId = req.params.pId;
    const product = req.body;
    const productBefore = await productsList.getProductById(productId)
    if (productBefore[0].owner === req.session.user.email || req.session.user.rol === "ADMIN") {
        const updatedProduct = await productsList.updateProduct(productId, product)
        res.send({ message: "success", payload: updatedProduct })
    } else {
        res.send("Usuario no autorizado")
    }
}

module.exports = {
    getAllProducts,
    getMyProduct,
    newProduct,
    deleteMyProduct,
    updateMyProduct
}