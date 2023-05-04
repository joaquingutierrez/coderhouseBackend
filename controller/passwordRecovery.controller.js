const nodemailer = require("nodemailer")
require("dotenv").config()
const { userManager } = require("../dao/mongoManager/UserManager")
const CryptoJS = require("crypto-js")

const secretKey = "CoderSecret"


const inputEmail = function (req, res) {
    res.render("passwordRecovery")
}
const inputPassword = (req, res) => {
    res.render("changePassword")
}


const sendRecoveryEmail = async (req, res) => {
    const recoveryEmail = req.body.email
/*     let transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_EMAIL_PASSWORD
        }
    }) */

    const encryptedEmail = CryptoJS.AES.encrypt(recoveryEmail, secretKey).toString()
    const recoveryLink = `localhost:8080/api/passwordrecovery/change-password/${encryptedEmail}`
    /*     await transporter.sendMail({
        from: '"Prueba" <prueba@gmail.com>',
        to: "joaquinguty@gmail.com",
        subject: "Mensaje de prueba",
        text: "Para cambiar la contraseña, haga click en el siguiente enlace",
        html: `<p>Para cambiar la contraseña, haga click en el siguiente enlace: </p><a>${recoveryLink}</a>`
    })
    res.send("Correo enviado") */
    
    console.log(recoveryLink)
}

const changePassword = async (req, res) => {
    const encryptedEmail = req.params.id
    const originalEmail = CryptoJS.AES.decrypt(encryptedEmail, secretKey).toString(CryptoJS.enc.Utf8)
    const newPassword = req.body.password
    console.log(newPassword)
    await userManager.updateUserPassword(originalEmail, newPassword)
}

module.exports = {
    inputEmail,
    inputPassword,
    sendRecoveryEmail,
    changePassword
}