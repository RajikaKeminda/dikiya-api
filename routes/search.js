var express = require('express');
var router = express.Router();
var con = require('../db').connection
var guard = require('./guard');

router.post('/', guard, function (req, res, next) {

    const uid = req.headers['uid'];

    if (uid) {
        con.query('select * from (select p.*, u.url from ' + req.body['table'] + ' as p inner join urls as u on u.product_id = p.id and uid=?) as t group by t.id' + ' having ' + req.body['col'] + ' LIKE "%' + req.body['param'] + '%"',[uid],(err, rows, fields) => {
            if (!err)
                res.json(rows)
            else
                res.json(err)
        })
    }else {
        con.query('select * from (select p.*, u.url ,users.type from (('+ req.body['table'] +' as p inner join urls as u on u.product_id = p.id) inner join users on  users.id = p.uid)) as t group by t.id' + ' having ' + req.body['col'] + ' LIKE "%' + req.body['param'] + '%"', (err, rows, fields) => {
            if (!err)
                res.json(rows)
            else
                res.json(err)
        })
    }

 

});

module.exports = router;