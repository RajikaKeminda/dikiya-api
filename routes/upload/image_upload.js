var express = require('express');
var router = express.Router();
var con = require('../../db').connection
const { v4: uuidv4 } = require('uuid');
var guard = require('../guard')


router.post('/', guard,function (req, res, next) {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    var file = req.files;
    var data = JSON.parse(req.body.data);
    var id = data['id']

    let image = file.image;
    let name = uuidv4() + image.name;
    let path = 'public/uploads/' + name;
    image.mv(path, (err) => {
        if (err)
            return console.log(err);

        con.query('INSERT INTO urls(url, product_id) values(?,?)', [name, id], (error, result, fields) => {
            if (error) {
                return con.rollback(function () {
                    console.log(error);;
                });
            }
            res.json("success")
        })
    })
});

module.exports = router;