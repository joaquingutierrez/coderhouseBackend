const fs = require('fs')

class ProductManager {
    static id = 0;
    constructor(path) {
        this.path = path;
        this.getProducts()
        this.file = fs.writeFileSync(this.path, JSON.stringify(this.products))
    }
    addProduct(product) {
        const { title, description, price, thumbnail, code, stock } = product;
        this.getProducts();
        const lastIndex = this.products.length - 1
        if (lastIndex >= 0) {
            ProductManager.id = this.products[lastIndex].id
        }
        if (title && description && price && thumbnail && code && stock) {
            if (!this.products.some((item) => item.code === product.code)) {
                ProductManager.id++;
                product = {
                    ...product,
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
        Object.defineProperty(productId, property, { value: value });
        this.writeProductsList();
    }
    deleteProduct(id) {
        const productId = this.getProductById(id);
        const index = this.products.indexOf(productId);
        this.products.splice(index, 1);
        this.writeProductsList();
    }
}


//test

// const testList = new ProductManager('./testList.JSON')

// console.log(ProductManager.id)
// console.log(testList.getProducts())

console.log('-------------------------------------')

//producto normal
const test = {
    title: 'producto prueba',
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 25
}
//producto repetido
const test2 = {
    title: 'producto prueba',
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 25
}
//producto normal
const test3 = {
    title: 'producto prueba',
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail: 'Sin imagen',
    code: 'abc123456',
    stock: 25
}
//producto normal
const test4 = {
    title: 'producto prueba',
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail: 'Sin imagen',
    code: 'abc123456789',
    stock: 25
}
//producto con propiedades faltantes
const test5 = {
    title: 'producto prueba',
    description: 'Este es un producto prueba',
    price: 200,
    code: 'abcdfg123456789',
    stock: 25
}


//console.log(ProductManager.id)
// testList.addProduct(test)
//console.log(testList.getProducts())

console.log('-------------------------------------')

//console.log(ProductManager.id)
// testList.addProduct(test2)
//console.log(testList.getProducts())

console.log('-------------------------------------')

//console.log(ProductManager.id)
// testList.addProduct(test3)
//console.log(testList.getProducts())

console.log('-------------------------------------')

//console.log(ProductManager.id)
// testList.addProduct(test4)
//console.log(testList.getProducts())

console.log('-------------------------------------')

//console.log(ProductManager.id)
// testList.addProduct(test5)
//console.log(testList.getProducts())

console.log('-------------------------------------')

//console.log(testList.getProductById(1));

// testList.updateProduct(2, 'price', 999999999)

// testList.deleteProduct(2)