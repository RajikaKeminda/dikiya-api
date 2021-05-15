var express = require('express');
var router = express.Router();
var con = require('../db').connection
var guard = require('./guard');

router.post('/', guard, function (req, res, next) {

    let response = {
        values: [],
        urls: []
    };
    con.query('select * from users where id=? limit 1', [req.body['id']], (err, rows, fields) => {
        if (!err) {
            res.json(rows)
        }
        else {
            res.json(err)
        }
    });

});

module.exports = router;