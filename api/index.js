
var express = require('express'),
    router = express.Router();

router.post('/', function (req, res) {
 res.status(200).send({
                success: true,
                message: "Hello world."
            });
});
module.exports = router;
