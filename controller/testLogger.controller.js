const getLoggerTest = async (req, res) => {
    req.logger.silly("Prueba de silly")
    req.logger.debug("Prueba de debug")
    req.logger.verbose("Prueba de verbose")
    req.logger.http("Prueba de http")
    req.logger.info("Prueba de info")
    req.logger.warn("Prueba de warn")
    req.logger.error("Prueba de error")
    res.send("Hola desde loggerTest")
}

module.exports = {
    getLoggerTest
}