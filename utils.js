const bcrypt = require('bcrypt');
const saltRounds = 10;


const passwordHash = (password) => bcrypt.hash(password, saltRounds)

const isValidPassword = (password, user) => bcrypt.compare(password, user.password)


module.exports = {
    passwordHash,
    isValidPassword
}