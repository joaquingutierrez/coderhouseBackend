const express = require('express');
const usersRouter = express.Router();
const { changeRol, uploadDocuments, getAllUsers, deleteInactiveUsers, deleteUserByEmail } = require("../controller/users.controller")
const { uploader } = require("../middleware/multer")
const {auth} = require("../middleware/auth")

const multerMiddleware = uploader.single('uploaded_file')

usersRouter.get("",auth, getAllUsers)
usersRouter.delete("", auth, deleteInactiveUsers)
usersRouter.delete("/:email", auth, deleteUserByEmail)
usersRouter.get("/premium/:uid", changeRol)
usersRouter.post("/:uid/documents", multerMiddleware, uploadDocuments)

module.exports = {
    usersRouter
}