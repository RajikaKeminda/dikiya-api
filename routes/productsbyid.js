var express = require('express');
var router = express.Router();
var con = require('../db').connection
var guard = require('./guard');

router.post('/', guard, function (req, res, next) {


    con.query('select * from (select p.*, u.url from products as p inner join urls as u on u.product_id = p.id and uid=?) as t group by t.id', [req.body['id']], (err, rows, fields) => {
        if (!err)
            res.json(rows)
        else
            res.json(err)
    })

});

module.exports = router;