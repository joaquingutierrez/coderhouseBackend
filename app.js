const express = require('express')
require('dotenv').config()
const { productsList } = require('./dao/mongoManager/ProductManager')
const app = express()
const { cartsRouter } = require('./routers/cartsRouter')
const { productsRouter } = require('./routers/productsRouter')
const { indexRouter } = require('./routers/indexRoute')
const { chatRouter } = require("./routers/chatRouter")
const { loginRouter } = require("./routers/loginRouter")
const { signupRouter } = require("./routers/signupRouter")
const { profileRouter } = require("./routers/profileRouter")
const { logoutRouter } = require("./routers/logoutRouter")
const { engine } = require('express-handlebars')
const { Server } = require('socket.io')
const { stringHTMLProducts } = require('./routers/productsRouter')
const { default: mongoose } = require('mongoose')
const { messagesModal } = require("./dao/mongoManager/models/messages.model")
const session = require('express-session')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', engine('handlebars'));
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + "/public"));

mongoose.connect(`mongodb+srv://${process.env.USER_MONGO}:${process.env.PASSWORD_MONGO}@cluster0.i34mf4h.mongodb.net/${process.env.DB_MONGO}?retryWrites=true&w=majority`, (err) => {
    if (err) {
        console.log("Error al conectarse a la Base de Datos", err);
    } else {
        console.log("Conectado con exito a la base de datos");
    }
})

app.use(
    session({
        secret: "coderhouse",
        resave: true,
        saveUninitialized: true
    })
);


app.use('/', loginRouter)
app.use('/api/carts', cartsRouter);
app.use('/api/products', productsRouter);
app.use('/chat', chatRouter)
app.use('/login', loginRouter)
app.use('/signup', signupRouter)
app.use('/profile', profileRouter)
app.use('/logout', logoutRouter)

const PORT = 8080
const httpServer = app.listen(PORT)
const socketServer = new Server(httpServer)
socketServer.on("connection", (socket) => {
    console.log("Usuario nuevo conectado")
    socket.on("new-user", async (data) => {
        socket.user = data.user;
        socket.id = data.id;
        socket.broadcast.emit("new-user-connected", {
            user: socket.user,
            id: socket.id,
        });
        //firstLoad
        const messages = await messagesModal.find()
        socket.emit("messagesLogs", messages)
    });
    socket.on("message", async (data) => {
        const newMessage = new messagesModal(data)
        await newMessage.save()
        const messages = await messagesModal.find()
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


