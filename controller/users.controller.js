const { userManager } = require("../dao/mongoManager/UserManager")

const changeRol =  async (req, res) => {
    const uid = req.params.uid
    const user = await userManager.findUserByID(uid)
    if (user.rol === "USER") {
        await userManager.updateUserRol(uid, "PREMIUM")
    } else {
        await userManager.updateUserRol(uid, "USER")
    }
    res.send("User rol updated")
}


module.exports = {
    changeRol
}