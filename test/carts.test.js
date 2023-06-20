const chai = require("chai")
const supertest = require("supertest")
require("dotenv").config()

const expect = chai.expect
const requester = supertest("http://localhost:8080")

let cookieResult
let cartId

describe("Products Test", () => {
    before(async () => {
        const newUser = {
            first_name: "Nombre de prueba",
            last_name: "Apellido de prueba",
            email: "email_de_prueba@gmail.com",
            age: 20,
            password: "123"
        }
        await requester.post("/signup").send(newUser)
        const loginUser = {
            email: "email_de_prueba@gmail.com",
            password: "123"
        }
        const { header } = await requester.post("/login").send(loginUser)
        cookieResult = header["set-cookie"]
    })

    it("Debe traer un array con todos los carritos", async () => {
        const { _body } = await requester.get("/api/carts").set("Cookie", [cookieResult])
        expect(_body).to.be.an("array")
    })
    it("Debe crear el carrito para el usuario", async () => {
        const { _body } = await requester.post("/api/carts").set("Cookie", [cookieResult])
        cartId = _body.payload.cartId
        expect(_body.payload).to.has.property("cartId")
    })
    it("Debe traer el render del carrito del usuario", async () => {
        const { statusCode } = await requester.get("/api/carts/" + cartId).set("Cookie", [cookieResult])
        expect(statusCode).to.be.equal(200)
    })
    it("Debe agregar un producto al carrito", async () => {
        const productId = "63e25b02ced6c39ce420118e" //Id de un producto de la base de datos eligido al azar
        const URL = "/api/carts/" + cartId + "/product/" + productId
        const {statusCode, _body} = await requester.post(URL).set("Cookie", [cookieResult])
        expect(statusCode).to.be.equal(200)
    })
    it("Debe poder eliminar el producto del carrito", async () => {
        const productId = "63e25b02ced6c39ce420118e" //Id de un producto de la base de datos eligido al azar
        const URL = `/api/carts/${cartId}/products/${productId}`
        const {statusCode} = await requester.delete(URL).set("Cookie", [cookieResult])
        expect(statusCode).to.be.equal(200)
    })
    it("Debe terminar con la compra", async () => {
        const URL = "/api/carts/" + cartId + "/purchase"
        const {statusCode} = await requester.post(URL).set("Cookie", [cookieResult])
        expect(statusCode).to.be.equal(200)
    })
    after(async () => {
        await requester.get("/logout")
        const admin_user = {
            email: process.env.ADMIN_EMAIL,
            password: process.env.ADMIN_PASSWORD
        }
        const { header } = await requester.post("/login").send(admin_user)
        cookieResult = header["set-cookie"]
        await requester.delete("/api/users/email_de_prueba@gmail.com").set("Cookie", [cookieResult])
    })
})