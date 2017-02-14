var express = require('express'),
    router = express.Router();

router.post('/', function (req, res) {
    res.status(200).send({
        success: true,
        message: "APIs are up and running."
    });
});

router.get('/', function (req, res) {
    res.status(200).send({
        success: true,
        message: "APIs are up and running."
    });
});

router.use('/beacons', require('./beacons.js'));

module.exports = router;
