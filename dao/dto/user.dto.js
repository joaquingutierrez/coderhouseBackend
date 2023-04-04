class UserDto {
    constructor(user) {
        this._id = user._id
        this.first_name = user.first_name
        this.last_name = user.last_name ? user.last_name : "No provisto"
        this.rol = user.rol
        this.age = user.age ? user.age : "No provista"
        this.email = user.email
        this.cart = user.cart
    }
}

module.exports = {
    UserDto
}