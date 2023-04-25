const winston = require('winston');
require('dotenv').config()

const myCustomColors = {
    error: "red",
    warn: "yellow",
    info: "blue",
    http: "magenta",
    verbose: "cyan",
    debug: "white",
    silly: "gray"
};

const environment = process.env.environment


if (environment === "production") {
    var logger = winston.createLogger({
        transports: [
            new winston.transports.Console({ 
                level: 'info',
                format: winston.format.combine(
                    winston.format.colorize({
                        all: true,
                        colors: myCustomColors
                    }))
                }),
            new winston.transports.File({
                filename: "./logs/errors.log",
                level: "error"
            })
        ],
    });
} else {
    var logger = winston.createLogger({
        transports: [
            new winston.transports.Console({
                level: 'debug',
                format: winston.format.combine(
                    winston.format.colorize({
                        all: true,
                        colors: myCustomColors
                    }))
                }),
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