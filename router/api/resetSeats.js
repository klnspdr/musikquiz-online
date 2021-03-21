let express = require('express');
let router = express.Router();
const {resetSeats} = require('../../modules/manageData');

router.post('/', function (req, res, next) {
    let sessionId = parseInt(req.query.sessionId);
    if (sessionId === undefined) {
        res.send(false);
        res.end();
    } else {
        resetSeats(sessionId);
        res.send(true);
        res.end();
    }
});

module.exports = router;

