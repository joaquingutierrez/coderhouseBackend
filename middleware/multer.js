const multer  = require('multer')


const storage = multer.diskStorage({
    destination: async function(req, file, cb) {
        const data = await req.body
        cb(null, "./public/img/documents/" + data.path)
    },
    filename: function(req, file, cb) {
        cb(null, req.session.user._id)
    }
})

const uploader = multer({storage})

module.exports = {
    uploader
}