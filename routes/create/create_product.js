var express = require('express');
var router = express.Router();
var con = require('../../db').connection
const { v4: uuidv4 } = require('uuid');
var guard = require('../guard');


router.post('/', guard,function (req, res, next) {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    var images = req.files;
    var data = JSON.parse(req.body.data);

    con.beginTransaction(function (err) {
        if (err) { throw err; }

        con.query('INSERT INTO products SET ?', [data], (error, result, fields) => {
            if (error) {
                return con.rollback(function () {
                    throw error
                })
            }

            var id = result.insertId;

            for (const key in images) {

                let file = images[`${key}`];
                let name = uuidv4() + file.name;
                let path = 'public/uploads/' + name;
                file.mv(path, (err) => {
                    if (err)
                        return console.log(err);

                    con.query('INSERT INTO urls(url, product_id) values(?,?)', [name, id], (error, result, fields) => {
                        if (error) {
                            return con.rollback(function () {
                                throw error;
                            });
                        }
                    })
                })

            }

            con.commit(function (err) {
                if (err) {
                    return con.rollback(function (err) {
                        throw err;
                    })
                }
            })

            res.json('success')
        })

    });

    // for (const key in images) {

    //     let file = images[`${key}`];
    //     let name = uuidv4() + file.name;
    //     nameList.push(name);
    //     let path = 'public/uploads/' + name;
    //     file.mv(path, (err) => {
    //         if (err)
    //             return console.log(err);

    //         con.query('INSERT INTO urls(uid)')
    //     })

    // }



});

module.exports = router;