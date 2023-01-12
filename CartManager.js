const fs = require('fs')

class CartManager {
    static cId = 0;
    constructor(path) {
        this.path = path;
        this.getCarts()
    }

    maxCartId() {
        CartManager.cId = this.carts.length || 0
    }
    addCart() {
        this.maxCartId()
        const cart =
        {
            cId: CartManager.cId,
            products: []
        }
        CartManager.cId++
        this.carts.push(cart)
        this.writeCartsList()
    }
    addProduct(cId, pId, quantity) {
        const cart = this.getCart(cId);
        if (pId && quantity) {
            if (!cart.products.some((item) => item.pId === pId)) {
                const product = {
                    pId: pId,
                    quantity: quantity
                };
                cart.products.push(product)
                return this.writeCartsList();

            }
            const product = cart.products.find(product => product.pId === pId);
            product.quantity += quantity;
            return this.writeCartsList();
        }
        throw new Error("Error: Missing product's properties");
    }
    getCarts() {
        try {
            this.carts = JSON.parse(fs.readFileSync(this.path, 'utf-8'))
        }
        catch {
            this.carts = []
            this.writeCartsList()
        }
    }
    getCart(cId) {
        const cart = this.carts.find((cart) => cart.cId === cId)
        return cart
    }
    writeCartsList() {
        fs.writeFileSync(this.path, JSON.stringify(this.carts, '', '\t'));
    }
    readCartsList() {
        return JSON.parse(fs.readFileSync(this.path, 'utf-8'))
    }
}

//test
const cartsList = new CartManager('./data_base/cartsList.json')


module.exports = {
    cartsList
}