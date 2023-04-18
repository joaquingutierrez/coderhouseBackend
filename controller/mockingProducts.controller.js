const { generateProducts } = require("../mock/utils")

const mockingProducts = function (req, res) {
    generateProducts(5)
    res.send("Generados 100 productos")
}

module.exports = {
    mockingProducts
}