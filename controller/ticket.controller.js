const { ticketsModel } = require("../dao/mongoManager/models/ticket.model")

const getTicket = async (req, res) => {
    const { codeTicket } = req.params
    const ticket = await ticketsModel.findOne({ code: codeTicket })
    const ticketJSON = JSON.stringify(ticket)
    res.render("ticket", {ticketJSON})
}

module.exports = {
    getTicket
}