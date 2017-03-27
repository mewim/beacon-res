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
    res.status(200).send({
        success: true,
        message: "Sample received."
    });
    DB.conn(function (db) {
        var samples = db.collection('samples');
        samples.insert(req.body, function (error, result) {
            db.close();
        });
    });
});

module.exports = router;
