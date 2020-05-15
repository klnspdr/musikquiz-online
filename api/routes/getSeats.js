let express = require('express');
let router = express.Router();
let { getSeats } = require('../modules/manageData');

router.get('/', function (req,res,next) {
    res.send(getSeats(req.query.sessionId));
});

module.exports = router;