const { userModel } = require("./models/users.model")
class UserManager {
    async updateUserCart(email, cart) {
        try {
            await userModel.findOneAndUpdate({ email: email }, {cart: cart})
        }
        catch (err) {
            throw err
        }
    }
}

const userManager = new UserManager

module.exports = {
    userManager
}