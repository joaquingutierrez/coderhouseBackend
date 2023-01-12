const { testList } = require("./ProductManager")
const express = require('express')
const app = express()
const { cartsRouter } = require('./routers/cartsRouter')
const { productsRouter } = require('./routers/productsRouter')
const {indexRouter} = require('./routers/indexRoute')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter)
app.use('/api/carts', cartsRouter);
app.use('/api/products', productsRouter);


app.listen(8080)