const { faker } = require("@faker-js/faker")
const { productsList } = require("../dao/mongoManager/ProductManager")

faker.locale = "es"

const generateProducts = (quantity) => {
    for (let i = 0; i < quantity; i++) {
        let product = {
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            code: faker.random.alphaNumeric(20),
            price: faker.commerce.price(100, 20000),
            thumbnail: [faker.image.imageUrl()],
            stock: faker.commerce.price(0, 30, 0),
            category: faker.commerce.department(),
            status: true
        }
        productsList.addProduct(product)
        console.log("producto generado")
    }
}

module.exports = {
    generateProducts
}