const renderSingup = function (req, res) {
    res.render("signup")
}

const register = async (req,res) => {
    res.status(201).json({ message: "success" })
}

const failRegister = async (req, res) => {
    console.log("Failed Strategy")
    res.send({error: "Failed"})
}

module.exports = {
    renderSingup,
    register,
    failRegister
}