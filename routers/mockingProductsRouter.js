const express = require('express');
const mockingProductsRouter = express.Router();
const { mockingProducts } = require("../controller/mockingProducts.controller")

mockingProductsRouter.get("", mockingProducts)

module.exports = {
    mockingProductsRouter
}