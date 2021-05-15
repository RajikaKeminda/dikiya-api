var express = require('express');
var router = express.Router();
var con = require('../db').connection
var guard = require('./guard');


router.get('/', guard, function (req, res, next) {
    con.query('select * from (select p.*, u.url ,users.type from ((products as p inner join urls as u on u.product_id = p.id) inner join users on  users.id = p.uid)) as t group by t.id', (err, result, fields) => {
        if (!err)
            res.json(result)
        else
            res.json({ "status": "err" })
    })
});

module.exports = router;
