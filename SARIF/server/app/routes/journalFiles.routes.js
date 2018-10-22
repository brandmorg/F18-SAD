
const multer = require("multer");

/*
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
*/

const upload = multer({
   dest: 'uploads/'
})


module.exports = function(app) {
    var journalFiles = require('../controllers/journalFiles.controller.js');

    // Create a new journal
    app.post('/api/journalFiles', upload.single('file'), (req, res,) => {
        if(!req.file){
            console.log("no file received")
        }
        else{
            console.log('file received');
            return res.json({
                success: true
            })
        }

    });

    // Retrieve a single journal by Id
    //app.get('/api/journalFiles:entry', journalFiles.findById);
}