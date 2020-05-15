let express = require('express');
let router = express.Router();
const {storeSeat, getSeats, resetSeat} = require('../modules/manageData');

router.post('/', function (req, res, next) {
    let seatValue = parseInt(req.query.seat);
    let sessionId = parseInt(req.query.sessionId);
    let name = req.query.name;
    if (req.query.seat === undefined || req.query.name === undefined || req.query.seat === null || sessionId === undefined) {
        res.send(false);
        res.end();
    } else if (seatValue < 1 || seatValue > 2) {
        res.send(false);
        res.end();
    } else {
        const actSeats = getSeats(sessionId);
        if(seatValue === 1) {
            if ((actSeats.l !== " " && actSeats.r !== " ") || actSeats.l === name || actSeats.m === name || actSeats.r === name) {
                res.send(false);
                res.end();
            } else {
                storeSeat(sessionId, seatValue, name);
                res.send(true);
            }
        } else if (seatValue === 2) {
            if (actSeats.m !== " ") {
                res.send(false);
                res.end();
            } else if(actSeats.r === name || actSeats.l === name){
                resetSeat(sessionId, name);
                storeSeat(sessionId,seatValue, name);
                res.send(true);
            } else {
                storeSeat(sessionId, seatValue, name);
                res.send(true);

            }
        }
    }
});

module.exports = router;