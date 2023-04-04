const {UserDto} = require("../dao/dto/user.dto")

const profile = function (req, res) {
    const user = new UserDto(req.session.user)
    res.render("profile", { user })
}

module.exports = {
    profile
}