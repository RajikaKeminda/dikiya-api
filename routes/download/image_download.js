var express = require('express');
var router = express.Router();
var con = require('../../db').connection
var guard = require('../guard');
var AdmZip = require('adm-zip');
var fs = require('fs');

router.post('/', guard, function (req, res, next) {

    // public/uploads/profilef0023aa3-41b0-40c8-b1ae-a884d17ab7e92.jpg
    var zip = new AdmZip();


    con.query('select * from urls where product_id=?', [req.body['id']], (err, result, fields) => {
        if (!err) {
            var outputFilePath = 'public/' + Date.now() + "output.zip";
            result.forEach(value => {
                zip.addLocalFile('public/uploads/' + value.url);
            });
            fs.writeFileSync(outputFilePath, zip.toBuffer());
            res.download(outputFilePath, (err) => {
                fs.unlinkSync(outputFilePath)
            });
        }
        else { res.json({ "status": "err" }) }
    })


});

module.exports = router;