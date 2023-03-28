const logout = function (req, res) {
    req.session.destroy()
    res.status(200).redirect("/login")
}

module.exports = {
    logout
}