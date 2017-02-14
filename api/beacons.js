var express = require('express'),
    router = express.Router();

router.get('/', function (req, res) {
 res.status(200).send({
                success: true,
                message: "APIs are up and running."
            });
});