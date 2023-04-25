const winston = require('winston');
require('dotenv').config()

const environment = process.env.environment
if (environment === "production") {
    var logger = winston.createLogger({
        transports: [
            new winston.transports.Console({ level: 'info' }),
            new winston.transports.File({
                filename: "./logs/errors.log",
                level: "error"
            })
        ],
    });
} else {
    var logger = winston.createLogger({
        transports: [
            new winston.transports.Console({ level: 'debug' }),
            new winston.transports.File({
                filename: "./logs/errors.log",
                level: "error"
            })
        ],
    });
}


const addLogger = (req, res, next) => {
    req.logger = logger
    req.logger.http(`${req.method} en ${req.url} - ${new Date().toDateString()}`)
    next()
}

module.exports = {
    addLogger
}