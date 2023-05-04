const nodemailer = require("nodemailer")
require("dotenv").config()

let transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_EMAIL_PASSWORD
    }
})



const sendEmail = async function (req, res) {
    let info = await transporter.sendMail({
        from: '"Prueba" <prueba@gmail.com>',
        to: "joaquinguty@gmail.com",
        subject: "Mensaje de prueba",
        text: "Hola Mundo",
        html: "<b>HOLA MUNDO EN NEGRITA</b>"
    })
    res.send("Correo enviado")
}

module.exports = {
    sendEmail
}