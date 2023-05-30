const express = require('express');
const usersRouter = express.Router();
const { changeRol, uploadDocuments } = require("../controller/users.controller")
const { uploader } = require("../middleware/multer")

const multerMiddleware = uploader.single('uploaded_file')

usersRouter.get("/premium/:uid", changeRol)
usersRouter.post("/:uid/documents", multerMiddleware, uploadDocuments)

module.exports = {
    usersRouter
}