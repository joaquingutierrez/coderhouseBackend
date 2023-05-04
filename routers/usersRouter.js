const express = require('express');
const usersRouter = express.Router();
const { changeRol } = require("../controller/users.controller")

usersRouter.get("/premium/:uid", changeRol)

module.exports = {
    usersRouter
}