class ProductManager {
    static id = 0;
    constructor() {
        this.products = [];
    }
    addProduct(product) {
        const { title, description, price, thumbnail, code, stock } = product;
        if (title && description && price && thumbnail && code && stock) {
            if (!this.products.some((item) => item.code === product.code)) {
                ProductManager.id++;
                return this.products = [
                    ...this.products,
                    {
                        ...product,
                        id: ProductManager.id
                    }
                ]
            }
            throw new Error('The product already exists in the list')
        }
        throw new Error("Error: Missing product's properties")
    }
    getProducts() {
        return this.products
    }
    getProductById(id) {
        const productFiltered = (this.products.filter((item) => item.id === id))
        if (productFiltered) {
            return productFiltered
        }
        throw new Error('Error: Product not found')
    }
    updateProduct(id, product) {

    }
    deleteProduct(id) {

    }
}


//test

const testList = new ProductManager()

console.log(ProductManager.id)
console.log(testList.getProducts())

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


console.log(ProductManager.id)
testList.addProduct(test)
console.log(testList.getProducts())

console.log('-------------------------------------')

console.log(ProductManager.id)
//testList.addProduct(test2)
console.log(testList.getProducts())

console.log('-------------------------------------')

console.log(ProductManager.id)
testList.addProduct(test3)
console.log(testList.getProducts())

console.log('-------------------------------------')

console.log(ProductManager.id)
testList.addProduct(test4)
console.log(testList.getProducts())

console.log('-------------------------------------')

console.log(ProductManager.id)
//testList.addProduct(test5)
console.log(testList.getProducts())

console.log('-------------------------------------')

console.log(testList.getProductById(1));