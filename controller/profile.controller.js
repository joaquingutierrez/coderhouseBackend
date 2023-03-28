const profile = function (req, res) {
    const user = req.session.user
    res.render("profile", { user })
}

module.exports = {
    profile
}