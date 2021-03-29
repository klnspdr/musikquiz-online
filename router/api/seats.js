let express = require('express');
let router = express.Router();
const {storeSeat, getSeats, resetSeat, resetSeats} = require('../../modules/manageSeats');
const {getIo} = require('../../modules/socket-io');
const io = getIo();

router.get('/', function (req,res,next) {
    res.send(getSeats(req.query.sessionId));
});

router.post('/reset', function (req, res, next) {
    let sessionId = parseInt(req.query.sessionId);
    const io = getIo();
    if (sessionId === undefined) {
        res.send(false);
        res.end();
    } else {
        io.emit('update-seats', resetSeats(sessionId))
        res.send(true);
        res.end();
    }
});

router.post('/store', function (req, res, next) {
    const io = getIo();
    let seatValue = parseInt(req.query.seat);
    let sessionId = parseInt(req.query.sessionId);
    let name = req.query.name;
    if (req.query.seat === undefined || req.query.name === undefined || req.query.seat === null || sessionId === undefined) {
        res.send(false);
        res.end();
    } else if (seatValue < 1 || seatValue > 2) {
        io.emit('update-seats', getSeats(sessionId))

        res.send(false);
        res.end();
    } else {
        const actSeats = getSeats(sessionId);
        if(seatValue === 1) {
            if ((actSeats.l !== " " && actSeats.r !== " ") || actSeats.l === name || actSeats.m === name || actSeats.r === name) {
                io.emit('update-seats', getSeats(sessionId))

                res.send(false);
                res.end();
            } else {
                storeSeat(sessionId, seatValue, name);
               io.emit('update-seats', getSeats(sessionId))

                res.send(true);
            }
        } else if (seatValue === 2) {
            if (actSeats.m !== " ") {
                io.emit('update-seats', getSeats(sessionId))

                res.send(false);
                res.end();
            } else if(actSeats.r === name || actSeats.l === name){
                resetSeat(sessionId, name);
                storeSeat(sessionId,seatValue, name);
                io.emit('update-seats', getSeats(sessionId))

                res.send(true);
            } else {
                storeSeat(sessionId, seatValue, name);
                io.emit('update-seats', getSeats(sessionId))

                res.send(true);

            }
        }
    }
   // res.send(true);
});

module.exports = router;

