const {EErrors} = require("../../services/errors/enum")

const errorMiddleware = (error, req, res, next) => {
    console.log(error.code)
    req.logger.error(error.code)
    switch (error.code) {
        case EErrors.INVALID_TYPES_ERROR:
            console.log(error.name)
            req.logger.error(error.name)
            res.send({status:"error", error:error.name})
            break
        default:
            console.log("Unhandled error")
            req.logger.error("Unhandled error")
            res.send({status:"error",error:"Unhandled error"})
    }
}

module.exports = {
    errorMiddleware
}