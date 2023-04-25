const redirectIfLogin = function (req, res) {
    req.session.user ?
        res.redirect("/api/session/current") :
        res.render("login")
}

const login = async (req, res) => {
    try {
        if (!req.user) return res.status(400).send({ status: "error", error: "Invalid credentials" })
        req.session.user = {
            rol: req.user.rol,
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            age: req.user.age,
            email: req.user.email
        }
        res.status(200).json({ message: "success", data: req.user })
    }
    catch (err) {
        req.logger.error(err)
        console.log(err)
    }
}

const failLogin = async (req, res) => {
    req.logger.error("Failed Strategy")
    console.log("Failed Strategy")
    res.send({ error: "Failed" })
}

const loginGitHubSuccess = (req, res) => {
    req.session.user = req.user;
    res.redirect('/api/products');
}

module.exports = {
    redirectIfLogin,
    login,
    failLogin,
    loginGitHubSuccess
}