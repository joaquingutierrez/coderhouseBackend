const { userModel } = require("./models/users.model")
class UserManager {
    async getAllUsers() {
        try {
            return userModel.find()
        }
        catch (err) {
            throw err
        }
    }
    async updateUserCart(email, cart) {
        try {
            await userModel.findOneAndUpdate({ email: email }, { cart: cart })
        }
        catch (err) {
            throw err
        }
    }
    async findUserByID(uid) {
        return await userModel.findById(uid)
    }
    async findUser(email) {
        return await userModel.findOne({ email: email })
    }
    async updateUserPassword(email, password) {
        try {
            return await userModel.findOneAndUpdate({ email: email }, { password: password })
        }
        catch (err) {
            throw err
        }
    }
    async updateUserRol(_id, rol) {
        try {
            return await userModel.findByIdAndUpdate(_id, { rol: rol })
        }
        catch (err) {
            throw err
        }
    }
    async updateUserLastConection(_id) {
        try {
            return await userModel.findByIdAndUpdate(_id, { last_conection: Date() })
        }
        catch (err) {
            throw err
        }
    }
    async deleteInactiveUsers(_id) {
        try {
            return await userModel.findByIdAndDelete(_id)
        }
        catch (err) {
            throw err
        }
    }
    async deleteUserByEmail(email) {
        try {
            return await userModel.findOneAndDelete({email: email})
        }
        catch (err) {
            throw err
        }
    }
   /*  async updateUserDocuments(_id, typeOfDocument, documentFile) {
        let indexOfDocument
        switch (typeOfDocument) {
            case "identificaion":
                indexOfDocument = 0
                break
            case "comprobante_de_domicilio":
                indexOfDocument = 1
                break
            case "comprobante_de_estado_de_cuenta":
                indexOfDocument = 2
                break
            default:
                indexOfDocument = -1

        }
        try {
            return await userModel.findByIdAndUpdate(_id, { $push: { "documents": {documentFile}, position: indexOfDocument } })
        }
        catch (err) {
            throw err
        }
    } */
}

const userManager = new UserManager

module.exports = {
    userManager
}