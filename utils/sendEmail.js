const nodemailer = require("nodemailer")
require("dotenv").config()


const sendEmailOfConfirmationProductDelete = async (email, product) => {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_EMAIL_PASSWORD
        }
    })
    await transporter.sendMail({
        from: '"E-commerce" <no-contestar@gmail.com>',
        to: email,
        subject: "Producto borrado",
        text: `Se borró un producto del cual usted era propietario ${product.toString()}`,
        html: `<p>Se borró un producto del cual usted era propietario ${product.toString()}</p>`
    })
}

module.exports = {
    sendEmailOfConfirmationProductDelete
}