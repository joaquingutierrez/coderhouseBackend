const { userManager } = require("../dao/mongoManager/UserManager")

const changeRol =  async (req, res) => {
    const uid = req.params.uid
    const user = await userManager.findUserByID(uid)
    if (user.rol === "USER") {
        //requiere documentacion para acreditar que puede actualizar a premium
        req.session.user.rol = "PREMIUM"
        await userManager.updateUserRol(uid, "PREMIUM")
    } else {
        req.session.user.rol = "USER"
        await userManager.updateUserRol(uid, "USER")
    }
    res.send({message: "success"})
}

const uploadDocuments = async (req, res) => {
    data = await req.body
    console.log(data)
    res.send("Recibido")
}

module.exports = {
    changeRol,
    uploadDocuments
}