const { cartsModel } = require("./models/carts.model")
const { productsModel } = require("./models/products.model")

class CartManager {
    async getCarts() {
        try {
            const carts = await cartsModel.find()
            return carts
        }
        catch (err) {
            throw err
        }
    }
    async getCart(cartId) {
        try {
            const cart = await cartsModel.findOne({ _id: cartId }).populate("products.productId")
            return cart
        }
        catch {
            throw new Error("Carrito no encontrado")
        }
    }
    async addCart() {
        try {
            const newCart = new cartsModel([])
            await newCart.save()
            return newCart
        }
        catch (err) {
            throw err
        }
    }
    async addProduct(cartId, productId, quantity) {
        try {
            const cart = await cartsModel.findOne({ _id: cartId })
            if (productId && quantity) {
                if (!(cart.products.some((item) => item.productId === productId))) {
                    cart.products.push({
                        productId: productId,
                        quantity: quantity
                    })
                }
                else {
                    const index = cart.products.findIndex((item) => item.productId === productId)
                    cart.products[index].quantity += quantity
                }
                await cartsModel.findByIdAndUpdate(cartId, cart)
                return cart
            }
            throw new Error("Faltan propiedades")
        }
        catch (err) {
            throw err
        }
    }
    async deleteProduct(cartId, productId) {
        await cartsModel.updateOne({ _id: cartId }, {
            $pull: {
                products: { productId: productId }
            }
        })
    }
    async newCart(cartId, newCart) {
        await cartsModel.updateOne({ _id: cartId },
            {
                $set: {
                    products: newCart
                }
            })
    }
    async newProductQuantity(cartId, productId, newQuantity) {
        await cartsModel.updateOne({ _id: cartId, "products.productId": productId },
            {
                $set: { "products.$.quantity": newQuantity }
            }
        )
    }

}

const cartsList = new CartManager()

module.exports = {
    cartsList
}