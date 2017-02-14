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

router.get('/sync', function (req, res) {
    beacons_version.drop();
    beacons.drop();
    request('http://minrva-dev.library.illinois.edu:8080/estimote/rest/v1.0/version', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }

    });
    res.status(200).send({
        success: true,
        message: "Sync completed."
    });
});

module.exports = router;
