const nodemailer = require("nodemailer")
require("dotenv").config()
const { userManager } = require("../dao/mongoManager/UserManager")
const CryptoJS = require("crypto-js")
const crypto = require("crypto")
const { passwordHash } = require("../utils")
const { resetPasswordModel } = require("../dao/mongoManager/models/resetPassword.model")

const secretKey = "CoderSecret"


const inputEmail = function (req, res) {
    res.render("passwordRecovery")
}
const inputPassword = (req, res) => {
    res.render("changePassword")
}


const sendRecoveryEmail = async (req, res) => {
    const recoveryEmail = req.body.email
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_EMAIL_PASSWORD
        }
    })
    const encryptedEmail = CryptoJS.AES.encrypt(recoveryEmail, secretKey).toString()
    const token = crypto.randomBytes(20).toString("hex")
    const resetPassword = new resetPasswordModel({
        email: encryptedEmail,
        token: token,
        expiration: Date.now() + 3600000
    })

    const result = await resetPassword.save()

    const recoveryLink = `localhost:8080/api/passwordrecovery/change-password/${token}`
    await transporter.sendMail({
        from: '"Recuperacion de contraseña" <no-contestar@gmail.com>',
        to: recoveryEmail,
        subject: "Recuperacion de contraseña",
        text: `Para cambiar la contraseña, haga click en el siguiente enlace: ${recoveryLink}`,
        html: `<p>Para cambiar la contraseña, haga click en el siguiente enlace: </p><a href=http://${recoveryLink}>${recoveryLink}</a>`
    })
    res.send("Correo enviado")

    console.log(recoveryLink)
}

const changePassword = async (req, res) => {
    const token = req.params.token
    const resetPassword = await resetPasswordModel.findOne({ token: token })
    console.log(Date.now())
    console.log(resetPassword.expiration)
    console.log(Date.now() < resetPassword.expiration)
    if ((resetPassword.status) && (Date.now() < resetPassword.expiration)) {
        const encryptedEmail = resetPassword.email
        const originalEmail = CryptoJS.AES.decrypt(encryptedEmail, secretKey).toString(CryptoJS.enc.Utf8)
        const newPassword = req.body.password
        const newPasswordHash = await passwordHash(newPassword)
        await userManager.updateUserPassword(originalEmail, newPasswordHash)
        resetPasswordModel.findOneAndUpdate({ token: token }, { status: false })
        res.send("success")
    } else {
        res.send("time out")
    }


}

module.exports = {
    inputEmail,
    inputPassword,
    sendRecoveryEmail,
    changePassword
}