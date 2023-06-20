const { cartsList, productsList } = require("../dao/factory")
const { userManager } = require("../dao/mongoManager/UserManager")
const { ticketsModel } = require("../dao/mongoManager/models/ticket.model")
const crypto = require("crypto")

const cartListRender = (cart) => {
    let acum = ""
    const products = cart?.products
    for (let i = 0; i < products.length; i++) {
        acum += `
        <tr>
            <td>${products[i].productId.title}</td>
            <td>${products[i].productId.description}</td>
            <td>${products[i].productId.price}</td>
            <td>${products[i].productId.category}</td>
            <td>${products[i].productId.stock}</td>
            <td>${products[i].quantity}</td>
        </tr>
        `
    }
    return acum
}



const getAllCarts = async (req, res) => {
    try {
        const carts = await cartsList.getCarts()
        res.send(carts)
    }
    catch (err) {
        throw err
    }
}

const newCart = async function (req, res) {
    try {
        if (req.session.user.rol !== "ADMIN") {
            if (!(req.session.user?.cart)) {
                const cart = await cartsList.addCart()
                const cartId = cart.id
                const userEmail = req.session.user.email
                await userManager.updateUserCart(userEmail, cartId)
                req.session.user = await userManager.findUser(userEmail)
                req.session.save()
                res.send({ message: "success", payload: { cartId: cartId } })
            } else {
                res.send({ message: "success", payload: { cartId: req.session.user.cart } })
            }
        }
    }
    catch (err) {
        throw err
    }
}

const getMyCart = async function (req, res) {
    const cId = req.params.cId;
    const cart = await cartsList.getCart(cId)
    const cartListRenderHTML = cartListRender(cart)
    res.render("cart", { style: "/css/cart.css", cartListRenderHTML, cId })
}

const addProductToMyCart = async function (req, res) {
    const { cId, pId } = req.params;
    const { quantity } = await req.body;
    const product = await productsList.getProductById(pId)
    if (product[0]?.owner === req.session.user.email) {
        res.send("No puede agregar un producto creado por usted")
    } else {
        await cartsList.addProduct(cId, pId, 1);
        const cart = await cartsList.getCart(cId)
        res.send({ message: "success", payload: cart })
    }
}

const deleteProductFromMyCart = async function (req, res) {
    //deberá eliminar del carrito el producto seleccionado.
    const { cId, pId } = req.params
    cartsList.deleteProduct(cId, pId)
    const cart = await cartsList.getCart(cId)
    res.send(cart)
}

const updateMyCart = async function (req, res) {
    //deberá actualizar el carrito con un arreglo de productos con el formato especificado arriba.
    const { cId } = req.params
    const newCart = await req.body
    await cartsList.newCart(cId, newCart)
    res.send("Carrito actualizado")
}

const updateProductQuantity = async function (req, res) {
    //deberá poder actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body
    const { cId, pId } = req.params
    const { newQuantity } = req.body
    cartsList.newProductQuantity(cId, pId, newQuantity)
    res.send("Cantidad actualizada")
}

const deleteAllProductsFromMyCart = async function (req, res) {
    //deberá eliminar todos los productos del carrito 
    const { cId } = req.params
    await cartsList.newCart(cId, [])
    res.send("Productos borrados con éxito")
}

const purchaseCart = async (req, res) => {
    const { cId } = req.params
    const amount = await cartsList.purchase(cId)
    if (amount > 0) {
        const ticket = await ticketsModel.create({
            code: crypto.randomBytes(20).toString('hex'),
            amount,
            purchaser: req.session.user.email
        })
        res.send({ message: "success", ticket })
    } else {
        res.send({ message: "error" })
        req.logger.warn("no hay stock de ningun producto")
        console.log("no hay stock de ningun producto")
    }
}

module.exports = {
    getAllCarts,
    newCart,
    getMyCart,
    addProductToMyCart,
    deleteProductFromMyCart,
    updateMyCart,
    updateProductQuantity,
    deleteAllProductsFromMyCart,
    purchaseCart
}