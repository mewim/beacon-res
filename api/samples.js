var express = require('express'),
    router = express.Router();

var request = require('request');

var DB = require("../db");

router.get('/', function (req, res) {
    res.status(200).send({
        success: true,
        message: "APIs are up and running."
    });
});

router.post('/', function (req, res) {
    DB.conn(function (db) {
        var samples = db.collection('samples');
        samples.insert(req.body, function (error, result) {
            if (error) {
                res.status(500).send({
                    success: false,
                    message: error
                });
            }
            else {
                res.status(200).send({
                    success: true,
                    message: "Sample saved."
                });
            }
            db.close();
        });
    });
});

module.exports = router;
