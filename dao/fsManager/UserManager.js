const fs = require('fs')

class UserManager {
    static id = 0;
    constructor(path) {
        this.path = path;
        this.getUsers()
    }
    findById(id) {
        this.getUsers();
        const userFiltered = (this.users.find((item) => item.id === id))
        if (userFiltered) {
            return userFiltered
        }
        throw new Error('Error: user not found')
    }
    addUser(user) {
        const { first_name, last_name, email, password, age } = user;
        this.getUsers();
        const lastIndex = this.users.length - 1
        if (lastIndex >= 0) {
            UserManager.id = this.users[lastIndex].id
        }
        if (first_name && last_name && email && password && age) {
            if (!this.users.some((item) => item.email === user.email)) {
                UserManager.id++;
                user = {
                    ...user,
                    rol: "User",
                    id: UserManager.id
                };
                this.users.push(user)
                return this.writeUsersList();
            }
            throw new Error('The User already exists in the list');
        }
        throw new Error("Error: Missing User's properties");
    }
    async getUsers() {
        try {
            return this.users = JSON.parse(fs.readFileSync(this.path, 'utf-8'))
        }
        catch {
            return this.users = []
        }
    }
    writeUsersList() {
        console.log(this.path);
        fs.writeFileSync(this.path, JSON.stringify(this.users, '', '\t'));
    }
    getUserByEmail(email) {
        this.getUsers();
        const userFiltered = (this.users.find((user) => user.email === email))
        if (userFiltered) {
            return userFiltered
        }
        return undefined
    }
    updateUser(id, property, value) {
        this.getUsers();
        const userId = this.getUserById(id);
        if (property !== "id") {
            Object.defineProperty(userId, property, { value: value });
            return this.writeUsersList();
        }
        throw new Error("No se puede cambiar el ID")
    }
    deleteUser(id) {
        const userId = this.getUserById(id);
        const index = this.users.indexOf(userId);
        this.users.splice(index, 1);
        this.writeUsersList();
    }
}


const userList = new UserManager('./data_base/userList.json')


module.exports = {
    userList
}