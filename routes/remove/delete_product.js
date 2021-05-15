var express = require('express');
var router = express.Router();
var con = require('../../db').connection;
var fs = require('fs');
var guard = require('../guard')

router.post('/', guard,function (req, res, next) {


    con.beginTransaction(function (err) {
        if (err) { res.json('error'); }

        con.query('SELECT * FROM urls WHERE product_id = ?', [req.body['id']], (error, result, fields) => {
            if (error) {
                return con.rollback(function () {
                    res.json('error');
                })
            }

            result.forEach(img => {
                console.log(img.url);
                try {
                    fs.unlinkSync('public/uploads/' + img.url);
                } catch (error) {
                    console.log(error);
                }
            });

            con.query('delete from urls where product_id = ?', [req.body['id']], (error, rows, fields) => {
                if (error) {
                    return con.rollback(function () {
                        res.json('error');
                    });
                }

                con.query('delete from products where id = ?', [req.body['id']], (error, rows, fields) => {
                    if (error) {
                        return con.rollback(function () {
                            tres.json('error');
                        });
                    }

                    con.commit(function (err) {
                        if (err) {
                            return con.rollback(function (err) {
                                res.json('error');
                            })
                        }

                        res.json('succuss');
                    })

                })

            })

        })

    });

});

module.exports = router;