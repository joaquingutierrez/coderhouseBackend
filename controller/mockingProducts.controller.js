const { generateProducts } = require("../mock/utils")

const mockingProducts = function (req, res) {
    const quantityOfProducts = 50
    generateProducts(quantityOfProducts)
    res.send("Generados", quantityOfProducts, "productos")
}

module.exports = {
    mockingProducts
}