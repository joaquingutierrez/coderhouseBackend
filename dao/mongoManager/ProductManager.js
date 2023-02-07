const { productsModel } = require("./models/products.model")

class ProductManager {
    async getProducts() {
        try {
            const products = await productsModel.find()
            return products
        }
        catch {
            console.log("Error al leer los productos");
        }
    }
    async getProductById(id) {
        const productFiltered = await productsModel.find({_id: id});
        if (productFiltered) {
            return productFiltered
        }
        throw new Error('Error: Product not found')
    }
    async addProduct(product) {
        try {
            const newProduct = new productsModel(product)
            await newProduct.save()
            return
        }
        catch {
            console.log("El producto ya existe o le faltan propiedades");
        }
    }
    async deleteProduct(productId) {
        try {
            await productsModel.findByIdAndDelete(productId)
            return
        }
        catch (err) {
            throw err
        }
    }
    async updateProduct(productId, product) {
        try {
            await productsModel.findByIdAndUpdate(productId, product)
        }
        catch (err) {
            throw err
        }
    }
}

const productsList = new ProductManager

module.exports = {
    productsList
}