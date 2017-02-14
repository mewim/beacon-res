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
                    if (error) {
                        res.status(500).send({
                            success: false,
                            message: "Cannot remove old beacon version."
                        });
                    }
                    else {
                        beacons_version.insert(parsed_version, function (error, result) {
                            if (error) {
                                res.status(500).send({
                                    success: false,
                                    message: "Cannot insert new beacon version."
                                });
                            }
                            else {
                                console.log('Beacon version synced.');
                                var beacons_version = db.collection('beacons');
                                request('http://minrva-dev.library.illinois.edu:8080/estimote/rest/v1.0/beacons', function (error, response, body) {
                                    var beacons = db.collection('beacons');
                                    beacons_version.remove({}, function (error, number_removed) {
                                        if (!error && response.statusCode == 200) {
                                            var parsed_beacons = JSON.parse(body);
                                            var beacons = db.collection('beacons');
                                            beacons.remove({}, function (error, number_removed) {
                                                if (error) {
                                                    res.status(500).send({
                                                        success: false,
                                                        message: "Cannot remove old beacons."
                                                    });
                                                }
                                                else {
                                                    beacons.insertMany(parsed_beacons, function (error, result) {
                                                        if (error) {
                                                            res.status(500).send({
                                                                success: false,
                                                                message: "Cannot insert new beacons."
                                                            });
                                                        }
                                                        else {
                                                            res.status(200).send({
                                                                success: true,
                                                                message: "Sync completed."
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                        else {
                                            res.status(500).send({
                                                success: false,
                                                message: "Cannot download beacons from remote server."
                                            });
                                        }
                                    });
                                });
                            }
                        });
                    }
                });
            });
        }
        else {
            res.status(500).send({
                success: false,
                message: "Cannot download beacon version from remote server."
            });
        }
    });
});

module.exports = router;
