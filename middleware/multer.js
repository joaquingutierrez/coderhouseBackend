const multer  = require('multer')


const storage = multer.diskStorage({
    destination: async function(req, file, cb) {
        let filePath = ""
        const folder = await req.body
        switch (folder.path) {
            case "profiles":
                filePath = `./public/img/profiles`
                break
            case "products":
                filePath = `./public/img/products`
                break
            default:
                filePath = `./public/img/documents/${folder.path}`
                break
        }
        console.log(filePath)
        cb(null, filePath)
    },
    filename: function(req, file, cb) {
        cb(null, req.session.user._id)
    }
})

const uploader = multer({storage})

module.exports = {
    uploader
}