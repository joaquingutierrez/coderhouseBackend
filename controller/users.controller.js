const { userManager } = require("../dao/mongoManager/UserManager")
const fs = require("fs")
const path = require("path")
const { allUsersDTO } = require("../dao/dto/allUsers.dto")

const changeRol = async (req, res) => {
    const uid = req.params.uid
    const user = await userManager.findUserByID(uid)
    if (user.rol === "USER") {
        //requiere documentacion para acreditar que puede actualizar a premium
        const userId = req.session.user._id

        const identificacionPath = path.join(__dirname, "../public/img/documents/identificacion/" + userId)
        const identificacion = fs.existsSync(identificacionPath)
        const comprobante_de_domicilioPath = path.join(__dirname, "../public/img/documents/comprobante_de_domicilio/" + userId)
        const comprobante_de_domicilio = fs.existsSync(comprobante_de_domicilioPath)
        const comprobante_de_estado_de_cuentaPath = path.join(__dirname, "../public/img/documents/comprobante_de_estado_de_cuenta/" + userId)
        const comprobante_de_estado_de_cuenta = fs.existsSync(comprobante_de_estado_de_cuentaPath)

        if (identificacion && comprobante_de_domicilio && comprobante_de_estado_de_cuenta) {
            req.session.user.rol = "PREMIUM"
            await userManager.updateUserRol(uid, "PREMIUM")
        } else {
            return res.send({ message: "error" })
        }
    } else {
        req.session.user.rol = "USER"
        await userManager.updateUserRol(uid, "USER")
    }
    res.send({ message: "success" })
}

const uploadDocuments = async (req, res) => {
    try {
        res.send("Recibido")
    }
    catch (err) {
        console.log(err)
    }
}

const getAllUsers = async (req, res) => {
    const allUsers = await userManager.getAllUsers()
    const usersDataFiltered = allUsersDTO(allUsers)
    res.render("users", { style: "/css/users.css", data: JSON.stringify(usersDataFiltered) })
}

const deleteInactiveUsers = async (req, res) => {
    const allUsers = await userManager.getAllUsers()
    allUsers.map(user => {
        if (user.last_conection.getTime() < (Date.now() - 30 * 60 * 1000)) {
            userManager.deleteInactiveUsers(user._id)
        }
        res.send({ message: "success" })
    })
}
const deleteUserByEmail = async (req,res) => {
    const {email} = req.params
    await userManager.deleteUserByEmail(email)
    res.send({message: "success"})
}

module.exports = {
    changeRol,
    uploadDocuments,
    getAllUsers,
    deleteInactiveUsers,
    deleteUserByEmail
}