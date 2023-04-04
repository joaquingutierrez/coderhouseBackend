const auth = (req, res, next) => {
    const user = req.session.user
    if (user.rol === "ADMIN") {
        console.log("autorizado")
        next()
    }
}

module.exports = {
    auth
}