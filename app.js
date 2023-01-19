const express = require('express')
const app = express()
const { cartsRouter } = require('./routers/cartsRouter')
const { productsRouter } = require('./routers/productsRouter')
const { indexRouter } = require('./routers/indexRoute')
const { engine } = require('express-handlebars')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', engine('handlebars'));
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

app.use('/', indexRouter)
app.use('/api/carts', cartsRouter);
app.use('/api/products', productsRouter);


app.listen(8080)