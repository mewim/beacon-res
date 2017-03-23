var express = require('express');
var app = express();
var bodyParser = require('body-parser')

const DB = require('./db');

DB.conn(function (db) {
    console.log("Successfully connected to MongoDB");
    db.close();
});

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.json());

// Serve static assets from the /public folder
app.use(express.static('public'));

app.use('/api', require('./api/index.js'));

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});
