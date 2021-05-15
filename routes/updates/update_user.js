var express = require('express');
var router = express.Router();
var con = require('../../db').connection
var guard = require('../guard');

router.post('/', guard,function (req, res, next) {
    con.query('UPDATE users SET ? WHERE id = ?',[req.body['data'],req.body['id']],(err, result, fields) => {
        if (!err)
            res.json(result)
        else
            res.json({ "status": "err" })
    })
});

module.exports = router;
