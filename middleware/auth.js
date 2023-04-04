const auth = (req, res, next) => {
    const user = req.session.user || "none"
    if (user.rol === "ADMIN") {
        console.log("autorizado")
        next()
    } else {
        console.log("Usuario no autorizado")
        res.send("Usuario no autorizado")
    }
}

module.exports = {
    auth
}