var express = require('express');
var router = express.Router();
var con = require('../db').connection

router.post('/', function (req, res, next) {
    con.query('SELECT * FROM users WHERE email=? AND contact_number=? AND bday=? LIMIT 1',[req.body['email'],req.body['num'],req.body['bday']], (err, result, fields) => {
        if (!err)
            res.json(result);
        else
            res.json(err);
        // res.json({ "status": "err" })
    })
});

module.exports = router;