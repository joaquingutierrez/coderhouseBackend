const renderChat = async (req, res) => {
    res.render("chat", { title: "Chat" })
}

module.exports = {
    renderChat
}