var express = require('express');
var router = express.Router();
var con = require('../db').connection
var guard = require('./guard');


router.post('/', guard, function (req, res, next) {
    con.query('INSERT INTO ' + req.body['table'] + ' SET ?', [req.body['data']], (err, result, fields) => {
        if (!err)
            res.json(result)
        else
            console.log(err);
        // res.json({ "status": "err" })
    })
});

module.exports = router;