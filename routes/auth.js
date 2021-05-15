var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var con = require('../db').connection

router.post('/', function (req, res, next) {
    con.query('SELECT * FROM users where pwd=? AND email=? LIMIT 1', [req.body['password'], req.body['email']], (err, result, field) => {
        if (result.length) {
            let modal = result[0];
            jwt.sign({ pwd: modal.password, name: modal.email }, process.env.TOKEN_SECRET, (err, token) => {
                console.log(token)
                if (err) return res.json(403)
                res.json({ token: token, id: modal.id, level: modal.level })
            })
        } else {
            res.json({ status: 'err' })
        }
    })
});

module.exports = router;