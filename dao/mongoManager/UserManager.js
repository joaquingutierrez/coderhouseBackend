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
    async findUser(email) {
        return await userModel.findOne({email: email})
    }
}

const userManager = new UserManager

module.exports = {
    userManager
}