const { productsList } = require('./dao/mongoManager/ProductManager')
const express = require('express')
const app = express()
const { cartsRouter } = require('./routers/cartsRouter')
const { productsRouter } = require('./routers/productsRouter')
const { indexRouter } = require('./routers/indexRoute')
const { chatRouter } = require("./routers/chatRouter")
const { engine } = require('express-handlebars')
const { Server } = require('socket.io')
const { stringHTMLProducts } = require('./routers/productsRouter')
const { default: mongoose } = require('mongoose')
const { messagesModel } = require("./dao/mongoManager/models/messages.model")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', engine('handlebars'));
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + "/public"));

mongoose.connect("mongodb+srv://Joaquin:SQfRoWZgEw1QkRDF@cluster0.i34mf4h.mongodb.net/ecommerce?retryWrites=true&w=majority", (err) => {
    if (err) {
        console.log("Error al conectarse a la Base de Datos");
    } else {
        console.log("Conectado con exito a la base de datos");
    }
})

app.use('/', indexRouter)
app.use('/api/carts', cartsRouter);
app.use('/api/products', productsRouter);
app.use('/chat', chatRouter)

const PORT = 8080
const httpServer = app.listen(PORT)
const socketServer = new Server(httpServer)
socketServer.on("connection", (socket) => {
    console.log("Usuario nuevo conectado")
    socket.on("new-user", (data) => {
        socket.user = data.user;
        socket.id = data.id;
        socket.broadcast.emit("new-user-connected", {
            user: socket.user,
            id: socket.id,
        });
    });
    socket.on("message", async (data) => {
        const newMessage = new messagesModel(data)
        await newMessage.save()
        const messages = await messagesModel.find()
        socketServer.emit("messagesLogs", messages);
    });
});




app.get("/realTimeProducts", async function (req, res) {
    const products = await productsList.getProducts()
    const productsRenderList = stringHTMLProducts(products)
    res.render("realTimeProducts", { productsRenderList })
})
app.post('/realTimeProducts', async function (req, res) {
    const newProduct = await req.body;
    await productsList.addProduct(newProduct)
    const products = await productsList.getProducts()
    socketServer.emit("emitPOST", products)
    res.send('Producto agregado satisfactoriamente')
})
app.delete("/realTimeProducts/:pId", async function (req, res) {
    const productId = req.params.pId;
    await productsList.deleteProduct(productId)
    const products = await productsList.getProducts()
    socketServer.emit("emitDELETE", products)
    res.send(`Producto con id: ${productId} eliminado satisfactoriamente`)
})


