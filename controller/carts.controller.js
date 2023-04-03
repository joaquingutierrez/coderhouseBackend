const { cartsList } = require("../dao/factory")

const cartListRender = (cart) => {
    let acum = ""
    const products = cart.products
    for (let i = 0; i < products.length; i++) {
        acum += `
        <div class="card">
            <h2>${products[i].productId.title}</h2>
            <p>Descripcion: ${products[i].productId.description}</p>
            <h4>Precio: $${products[i].productId.price}</h4>
            <h4>Categoria: ${products[i].productId.category}</h4>
            <h5>Stock: ${products[i].productId.stock}</h5>
        </div>
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
        await cartsList.addCart()
        res.send("Carrito agregado")
    }
    catch (err) {
        throw err
    }
}

const getMyCart = async function (req, res) {
    const cId = req.params.cId;
    const cart = await cartsList.getCart(cId)
    const cartListRenderHTML = cartListRender(cart)
    res.render("cart", {cartListRenderHTML, cId})
}

const addProductToMyCart = async function (req, res) {
    const { cId, pId } = req.params;
    const { quantity } = await req.body;
    cartsList.addProduct(cId, pId, quantity);
    const cart = cartsList.getCart(cId)
    res.send(cart)
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

module.exports = {
    getAllCarts,
    newCart,
    getMyCart,
    addProductToMyCart,
    deleteProductFromMyCart,
    updateMyCart,
    updateProductQuantity,
    deleteAllProductsFromMyCart
}