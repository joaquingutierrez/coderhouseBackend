const express = require('express');
const { cartsRouter } = require('./cartsRouter');
const indexRouter = express.Router();
const { testList } = require('../dao/fsManager/ProductManager')


indexRouter.get('', function (req, res) {
    res.render('index')
})




module.exports = {
        indexRouter
    }