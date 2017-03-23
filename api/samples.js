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
    console.log(req.body);

    // DB.conn(function (db) {
    // });
    res.status(200).send({
        success: true,
    });
});

module.exports = router;
