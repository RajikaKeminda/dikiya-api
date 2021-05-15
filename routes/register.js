var express = require('express');
var router = express.Router();
var con = require('../db').connection;

router.post('/', function (req, res, next) {
    con.query('INSERT INTO users SET ?', [req.body], (err, result, fields) => {
        if (!err)
            res.json('success')
        else
            res.json('error')
    })
});

module.exports = router;