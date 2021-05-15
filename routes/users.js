var express = require('express');
var router = express.Router();
var con = require('../db').connection
var guard = require('./guard');


router.get('/', guard, function (req, res, next) {
    con.query('select * from users', (err, result, fields) => {
        if (!err)
            res.json(result)
        else
            res.json({ "status": "err" })
    })
});

module.exports = router;