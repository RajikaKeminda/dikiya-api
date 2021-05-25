var express = require('express');
var router = express.Router();
var con = require('../db').connection


router.post('/', function (req, res, next) {
    con.query('UPDATE users SET pwd=? WHERE email=? AND contact_number=?', [req.body['pwd'], req.body['email'], req.body['num']], (err, result, fields) => {
        if (!err)
            res.json(result);
        else
            res.json(err);
        // res.json({ "status": "err" })
    })
});

module.exports = router;