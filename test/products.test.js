const chai = require("chai")
const supertest = require("supertest")

require("dotenv").config()

const expect = chai.expect
const requester = supertest("http://localhost:8080")

let cookieResult
let myTestingProductId

describe("Products Test", () => {
    before(async () => {
        const admin_user = {
            email: process.env.ADMIN_EMAIL,
            password: process.env.ADMIN_PASSWORD
        }
        const JSON_admin_user = JSON.stringify(admin_user)
        const { header } = await requester.post("/login").send(admin_user)
        cookieResult = header["set-cookie"]
    })

    it("El endpoint debe traer el render de la página, para esto es necesario que: status = 200", async () => {
        const { statusCode } = await requester.get("/api/products").set("Cookie", [cookieResult])
        expect(statusCode).to.be.equal(200)
    })
    it("Se debe crear un nuevo producto en la base de datos", async () => {
        const mockProduct = {
            title: "Producto de Prueba",
            description: "Descripcion de prueba",
            code: "1dsa256d15as6d15as61d2sa3d1",
            price: 2500,
            stock: 25,
            category: "dasd"
        }
        const { _body } = await requester.post("/api/products").send(mockProduct).set("Cookie", [cookieResult])
        myTestingProductId = _body.payload._id
        expect(_body.message).to.be.equal("success")
    })
    it("Se debe traer el render del producto anteriormente creado y devolver un 200", async () => {
        const { statusCode } = await requester.get("/api/products/" + myTestingProductId).set("Cookie", [cookieResult])
        expect(statusCode).to.be.equal(200)
    })
    it("Se debe modificar el titulo del producto", async () => {
        const mockUpdateProduct = {
            title: "Producto de prueba 2 Actualizado"
        }
        const { _body } = await requester.put("/api/products/" + myTestingProductId).send(mockUpdateProduct).set("Cookie", [cookieResult])
        const titleUpdated = _body.payload.title
        expect(titleUpdated).to.not.equal("Producto de Prueba")
    })
    it("Se debe eliminar el producto creado en este mismo test y obtener un 200", async () => {
        const { statusCode } = await requester.delete("/api/products/" + myTestingProductId).set("Cookie", [cookieResult])
        expect(statusCode).to.be.equal(200)
    })
})