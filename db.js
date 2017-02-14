var DB_PATH = "admin:12345678@ds153239.mlab.com:53239/heroku_j86p4m70";

const db = require('monk')(DB_PATH);

module.exports = db;