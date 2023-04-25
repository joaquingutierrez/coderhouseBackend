const authUser = (req, res, next) => {
    const user = req.session.user || "none"
    if (user.rol !== "ADMIN") {
        req.logger.info("autorizado")
        console.log("autorizado")
        next()
    } else {
        req.logger.warn("Usuario no autorizado")
        console.log("Usuario no autorizado")
        res.send("Usuario no autorizado")
    }
}

module.exports = {
    authUser
}