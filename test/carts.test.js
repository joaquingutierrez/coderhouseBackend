const chai = require("chai")
const supertest = require("supertest")

const expect = chai.expect
const requester = supertest("http://localhost:8080")

let cookieResult
let cartId

describe("Products Test", () => {
    before(async () => {
        const user = {
            email: "email_de_prueba@gmail.com",
            password: "123"
        } //usuario creado en el testing de usuarios
        const { header } = await requester.post("/login").send(user)
        cookieResult = header["set-cookie"]
    })

    it("Debe traer un array con todos los carritos", async () => {
        const { _body } = await requester.get("/api/carts").set("Cookie", [cookieResult])
        expect(_body).to.be.an("array")
    })
    it("Debe crear el carrito para el usuario", async () => {
        const { _body } = await requester.post("/api/carts").set("Cookie", [cookieResult])
        cartId = _body.payload.cartId
        console.log(cartId)
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
        console.log(_body)
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
})