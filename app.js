const { testList } = require('./ProductManager')
const express = require('express')
const app = express()
const { cartsRouter } = require('./routers/cartsRouter')
const { productsRouter } = require('./routers/productsRouter')
const { indexRouter } = require('./routers/indexRoute')
const { engine } = require('express-handlebars')
const { Server } = require('socket.io')
const { stringHTMLProducts } = require('./routers/productsRouter')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', engine('handlebars'));
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + "/public"));

app.use('/', indexRouter)
app.use('/api/carts', cartsRouter);
app.use('/api/products', productsRouter);

const PORT = 8080
const httpServer = app.listen(PORT)
const socketServer = new Server(httpServer)
socketServer.on("connection", () => {
    console.log("Usuario nuevo conectado")
})

app.get("/realTimeProducts", async function (req, res) {
    const products = await testList.getProducts()
    const productsRenderList = stringHTMLProducts(products)
    res.render("realTimeProducts", { productsRenderList })
})
app.post('/realTimeProducts', async function (req, res) {
    const newProduct = await req.body;
    testList.addProduct(newProduct)
    socketServer.emit("emitPOST", testList.products)
    res.send('Producto agregado satisfactoriamente')
})
app.delete("/realTimeProducts/:pId", function (req, res) {
    const productId = parseInt(req.params.pId);
    testList.deleteProduct(productId)
    socketServer.emit("emitDELETE", testList.products)
    res.send(`Producto con id: ${productId} eliminado satisfactoriamente`)
})