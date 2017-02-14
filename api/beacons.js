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
    request('http://minrva-dev.library.illinois.edu:8080/estimote/rest/v1.0/version', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var parsed_version = JSON.parse(body);
            DB.conn(function (db) {
                var beacons_version = db.collection('beacons_version');
                beacons_version.remove({}, function (error, number_removed) {
                    beacons_version.insert(parsed_version, function (error, result) {
                        console.log('Beacon version synced.');
                        var beacons_version = db.collection('beacons');
                        request('http://minrva-dev.library.illinois.edu:8080/estimote/rest/v1.0/beacons', function (error, response, body) {
                            var beacons = db.collection('beacons');
                            beacons_version.remove({}, function (error, number_removed) {
                                if (!error && response.statusCode == 200) {
                                    var parsed_beacons = JSON.parse(body);
                                    console.log(body);
                                    res.status(200).send({
                                        success: true,
                                        message: "Sync completed."
                                    });
                                }
                            });
                        });
                    });
                });
            });
        }
    });
});

module.exports = router;
