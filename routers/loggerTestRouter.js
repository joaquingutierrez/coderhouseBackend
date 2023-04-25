const express = require('express');
const loggerTestRouter = express.Router();
const { getLoggerTest } = require("../controller/testLogger.controller")


loggerTestRouter.get("", getLoggerTest)


module.exports = {
    loggerTestRouter
}