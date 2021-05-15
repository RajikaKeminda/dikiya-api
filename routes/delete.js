var express = require('express');
var router = express.Router();
var con = require('../db').connection
var guard = require('./guard');


router.post('/', guard, function (req, res, next) {
    con.query('DELETE FROM ' + req.body['table'] + ' WHERE ' + req.body['col'] + '=' + req.body['param'], (err, result, fields) => {
        if (!err)
            res.json({ "status": "success" })
        else
            res.json({ "status": "err" })
    })
});

module.exports = router;