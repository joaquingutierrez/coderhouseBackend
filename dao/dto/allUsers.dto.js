const allUsersDTO = (arrayUsers) => {
    const newArray = arrayUsers.map(user => {
        return ({
            first_name: user.first_name,
            last_name: user.last_name ? user.last_name : "No provisto",
            rol: user.rol,
            email: user.email,
        })
    })
    return newArray
}

module.exports = {
    allUsersDTO
}