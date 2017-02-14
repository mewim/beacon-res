var express = require('express'),
    router = express.Router();

var request = require('request');

var db = require("../db");

const beacons = db.get('beacons');
const beacons_version = db.get('beacons_version');


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
            console.log(body) // Show the HTML for the Google homepage.
        }

    });
    res.status(200).send({
        success: true,
        message: "Sync completed."
    });
});

module.exports = router;
