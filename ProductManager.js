const fs = require('fs')

class ProductManager {
    static id = 0;
    constructor(path) {
        this.path = path;
        this.getProducts()
    }
    addProduct(product) {
        const { title, description, price, thumbnail, code, stock, category } = product;
        this.getProducts();
        const lastIndex = this.products.length - 1
        if (lastIndex >= 0) {
            ProductManager.id = this.products[lastIndex].id
        }
        if (title && description && price && thumbnail && code && stock && category) {
            if (!this.products.some((item) => item.code === product.code)) {
                ProductManager.id++;
                product = {
                    ...product,
                    status: true,
                    id: ProductManager.id
                };
                this.products.push(product)
                return this.writeProductsList();

            }
            throw new Error('The product already exists in the list');
        }
        throw new Error("Error: Missing product's properties");
    }
    getProducts() {
        try {
            return this.products = JSON.parse(fs.readFileSync(this.path, 'utf-8'))
        }
        catch {
            return this.products = []
        }
    }
    writeProductsList() {
        fs.writeFileSync(this.path, JSON.stringify(this.products, '', '\t'));
    }
    getProductById(id) {
        this.getProducts();
        const productFiltered = (this.products.find((item) => item.id === id))
        if (productFiltered) {
            return productFiltered
        }
        throw new Error('Error: Product not found')
    }
    updateProduct(id, property, value) {
        this.getProducts();
        const productId = this.getProductById(id);
        if (property !== "id") {
            Object.defineProperty(productId, property, { value: value });
            return this.writeProductsList();
        }
        throw new Error("No se puede cambiar el ID")
    }
    deleteProduct(id) {
        const productId = this.getProductById(id);
        const index = this.products.indexOf(productId);
        this.products.splice(index, 1);
        this.writeProductsList();
    }
}

//test
const testList = new ProductManager('./data_base/testList.json')


module.exports = {
    testList
}