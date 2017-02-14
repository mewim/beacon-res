var express = require('express'),
    router = express.Router();
var http = require('http');
var db = require("../db");

const beacons = db.get('beacons');
const beacons_version = db.get('beacons_version');


router.get('/', function (req, res) {
    res.status(200).send({
        success: true,
        message: "APIs are up and running."
    });
});

router.get('/sync', function(req, res){
    beacons_version.drop();
    beacons.drop();
    download_version(function(version_data){
        console.log(version_data);
    });

});

function download_version(callback){
    http.request({
        host: 'minrva-dev.library.illinois.edu',
        path: '/estimote/rest/v1.0/version',
        port: '8080',
        method: 'GET'
    }, function (res) {
        var body = '';
        res.on('data', function(d) {
            body += d;
        });
        res.on('end', function() {
            var parsed = JSON.parse(body);
            callback(parsed);
        });
    });
}

module.exports = router;
