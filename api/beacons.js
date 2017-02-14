var express = require('express'),
    router = express.Router();

var db = require("../db");
const beacons = db.get('beacons');

router.get('/', function (req, res) {
    res.status(200).send({
        success: true,
        message: "APIs are up and running."
    });
});

module.exports = router;
