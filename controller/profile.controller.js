const { UserDto } = require("../dao/dto/user.dto")

const profile = function (req, res) {
    const user = new UserDto(req.session.user)
    res.render("profile", {style: "/css/profile.css", user })
}
const getProfile = function (req, res) {
    const user = new UserDto(req.session.user)
    res.send({ messege: "success", user: user })
}

module.exports = {
    profile,
    getProfile
}