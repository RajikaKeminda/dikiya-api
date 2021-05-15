var express = require('express');
var router = express.Router();
var con = require('../db').connection
var guard = require('./guard');


router.post('/', guard, function (req, res, next) {
    con.query('UPDATE ' + req.body['table'] + ' SET ? ' + 'where ' + req.body['col'] + '=' + req.body['id'], [req.body['data']], (err, result, fields) => {
        if (!err)
            res.json({ "status": "success" })
        else
            res.json({ "status": "err" })
    })
});

module.exports = router;