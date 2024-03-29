const express = require('express')
require('dotenv').config()
const { productsList, cartsList } = require('./dao/factory')
const app = express()
const { cartsRouter } = require('./routers/cartsRouter')
const { productsRouter } = require('./routers/productsRouter')
const { indexRouter } = require('./routers/indexRoute')
const { chatRouter } = require("./routers/chatRouter")
const { loginRouter } = require("./routers/loginRouter")
const { signupRouter } = require("./routers/signupRouter")
const { profileRouter } = require("./routers/profileRouter")
const { logoutRouter } = require("./routers/logoutRouter")
const { ticketRouter } = require("./routers/ticketRouter")
const { mailRouter } = require("./routers/mailRouter")
const { passwordRecoveryRouter } = require("./routers/passwordRecoveryRouter")
const { mockingProductsRouter } = require("./routers/mockingProductsRouter")
const { loggerTestRouter } = require("./routers/loggerTestRouter")
const { usersRouter } = require("./routers/usersRouter")
const { paymentsRouter } = require('./routers/paymentsRouter')
const { successPaymentRouter } = require("./routers/successPaymentRouter")
const { engine } = require('express-handlebars')
const { Server } = require('socket.io')
const { stringHTMLProducts } = require('./controller/products.controller')
const { messagesModal } = require("./dao/mongoManager/models/messages.model")
const session = require('express-session')
const passport = require('passport')
const { initializePassport } = require('./dao/factory')
const { redirectIfSessionOff } = require("./middleware/redirectIfSessionOff")
const { errorMiddleware } = require("./middleware/errors")
const { addLogger } = require("./logger/utils")
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUiExpress = require("swagger-ui-express")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', engine('handlebars'));
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + "/public"));

initializePassport()
app.use(passport.initialize())


app.use(
    session({
        secret: "coderhouse",
        resave: true,
        saveUninitialized: true
    })
);

app.use(errorMiddleware)
app.use(addLogger)

app.use('/', indexRouter)
app.use('/api/carts', redirectIfSessionOff, cartsRouter);
app.use('/api/products', redirectIfSessionOff, productsRouter);
app.use('/chat', redirectIfSessionOff, chatRouter)
app.use('/login', loginRouter)
app.use('/signup', signupRouter)
app.use("/api/users", usersRouter)
app.use('/api/session/current', redirectIfSessionOff, profileRouter)
app.use('/logout', logoutRouter)
app.use("/api/ticket", redirectIfSessionOff, ticketRouter)
app.use("/api/mockingproducts", mockingProductsRouter)
app.use("/api/loggerTest", loggerTestRouter)
app.use("/api/mail", mailRouter)
app.use("/api/passwordrecovery", passwordRecoveryRouter)
app.use("/api/payments", paymentsRouter)
app.use("/success", successPaymentRouter)
app.use("/cancel", (req, res) => {
    res.send("Algo salio mal")
})

const PORT = process.env.PORT || 8080
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

const swaggerOptions = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "Documentacion del E-commerce",
            description: "API de productos, carritos y usuarios para un E-commerce"
        }
    },
    apis: ["./docs/**/*.yaml"]
}

const specs = swaggerJSDoc(swaggerOptions)
app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs))



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


