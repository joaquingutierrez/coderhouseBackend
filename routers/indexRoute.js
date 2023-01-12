const express = require('express');
const { cartsRouter } = require('./cartsRouter');
const indexRouter = express.Router();
const { testList } = require('../ProductManager')


indexRouter.get('', function (req, res) {
    res.send('Bienvenidos')
})




module.exports = {
        indexRouter
    }