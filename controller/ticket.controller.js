const { ticketsModel } = require("../dao/mongoManager/models/ticket.model")

const getTicket = async (req, res) => {
    const { codeTicket } = req.params
    const ticket = await ticketsModel.findOne({ code: codeTicket })
    res.send(ticket)
}

module.exports = {
    getTicket
}