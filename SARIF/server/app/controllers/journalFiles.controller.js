const db = require('../config/db.config.js');
const JournalFile = db.journalFiles;

exports.create = (req, res) => {
    // Save to postgres database
    let file = req.file.filename;
    let path = req.file.path;
    res.json({'message': 'File uploaded'});
    console.log(journalId);
    console.log(res);

    //JournalFile.create(journal).then(result => {
        // Send created customer to client
        //res.json(result);
    //});
};