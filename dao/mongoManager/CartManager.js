const { cartsModel } = require("./models/carts.model")
const { productsList } = require("./ProductManager")

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
                if (!(cart?.products.some((item) => item.productId.toString() === productId))) {
                    cart.products.push({
                        productId: productId,
                        quantity: quantity
                    })
                }
                else {
                    const index = cart.products.findIndex((item) => item.productId.toString() === productId)
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

    async getTotal(cId) {
        const cart = await cartsModel.findOne({ _id: cId }).populate("products.productId")
        if (cart.products.length > 0) {
            let amount = 0
            for (let i = 0; i < cart.products.length; i++) {
                amount += cart.products[i].productId.price * cart.products[i].quantity
            }
            return amount
        }
    }

    async purchase(cId) {
        const cart = await cartsModel.findOne({ _id: cId }).populate("products.productId")
        if (cart.products.length > 0) {
            let amount = 0
            for (let i = 0; i < cart.products.length; i++) {
                const pId = cart.products[i].productId._id.toString()
                const productStock = await productsList.getProductById(pId)
                if (productStock[0].stock >= cart.products[i].quantity) {
                    amount += cart.products[i].productId.price * cart.products[i].quantity
                    productStock[0].stock -= cart.products[i].quantity
                    await productsList.updateProduct(pId, { stock: productStock[0].stock })
                    this.deleteProduct(cId, cart.products[i].productId._id)
                }
            }
            return amount
        }
    }
}

const cartsList = new CartManager()

module.exports = {
    cartsList
}