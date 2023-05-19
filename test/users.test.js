const chai = require("chai")
const supertest = require("supertest")


const expect = chai.expect
const requester = supertest("http://localhost:8080")

let cookieResult

describe("users Test", () => {
    it("Debe crear un usuario nuevo", async () => {
        const newUser = {
            first_name: "Nombre de prueba",
            last_name: "Apellido de prueba",
            email: "email_de_prueba@gmail.com",
            age: 20,
            password: "123"
        }
        const { statusCode } = await requester.post("/signup").send(newUser)

        expect(statusCode).to.be.equal(201)
    })
    it("Debe iniciar sesion con el usuario creado anteriormente", async () => {
        const loginUser = {
            email: "email_de_prueba@gmail.com",
            password: "123"
        }
        const { header, _body } = await requester.post("/login").send(loginUser)
        cookieResult = header["set-cookie"]
        expect(_body.message).to.be.equal("success")
    })
    it("Los datos del usuario no deben contar con la password", async () => {
        const { _body } = await requester.get("/api/session/current/getProfile").set("Cookie", [cookieResult])
        expect(_body.user).to.not.has.property("password")
    })
    it("Debe traer el render del profile del usuario", async () => {
        const {statusCode} = await requester.get("/api/session/current").set("Cookie", [cookieResult])
        expect(statusCode).to.be.equal(200)
    })
})