var express = require('express');
var router = express.Router();
var con = require('../db').connection
var guard = require('./guard');

router.post('/', guard,function (req, res, next) {

    let response = {
        values: [],
        urls: []
    };
    con.query('select * from products where id=? limit 1', [req.body['id']], (err, rows, fields) => {
        if (!err) {
            response.values = rows;
            con.query('select * from urls where product_id=?', [req.body['id']], (err, rows, fields) => {
                if (!err) {
                    response.urls = rows
                    res.json(response);
                }
                else
                    res.json(err)
            })
        }
        else {
            res.json(err)
        }
    });

});

module.exports = router;