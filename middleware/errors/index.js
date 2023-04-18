const {EErrors} = require("../../services/errors/enum")

const errorMiddleware = (error, req, res, next) => {
    console.log(error.code)
    switch (error.code) {
        case EErrors.INVALID_TYPES_ERROR:
            res.send({status:"error", error:error.name})
            console.log(error.name)
            break
        default:
            res.send({status:"error",error:"Unhandled errorF"})
            console.log("Unhandled errorF")
    }
}

module.exports = {
    errorMiddleware
}