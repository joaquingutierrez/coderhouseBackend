const redirectIfSessionOff = (req, res, next) => {
    const user = req?.session?.user || "none"
    if (user === "none") {
        res.redirect("/login")
    } else {
        next()
    }
}

module.exports = {
    redirectIfSessionOff
}
