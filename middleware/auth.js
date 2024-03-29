const auth = (req, res, next) => {
    const user = req.session.user || "none"
    if (user.rol === "ADMIN") {
        req.logger.info("autorizado")
        console.log("autorizado")
        next()
    } else {
        req.logger.warn("Usuario no autorizado")
        console.log("Usuario no autorizado")
        res.send("Usuario no autorizado")
    }
}
const premiumAdminAuth = (req, res, next) => {
    const user = req.session.user || "none"
    if (user.rol === "ADMIN" || user.rol === "PREMIUM") {
        req.logger.info("autorizado")
        console.log("autorizado")
        next()
    } else {
        req.logger.warn("Usuario no autorizado")
        console.log("Usuario no autorizado")
        res.send({message: "Usuario no autorizado"})
    }
}

module.exports = {
    auth,
    premiumAdminAuth
}