let express = require('express');
let router = express.Router();
let getSeatsRouter  = require('./api/getSeats');
let storeSeatRouter  = require('./api/storeSeat');
let resetSeatsRouter  = require('./api/resetSeats');


router.use('/getSeats', getSeatsRouter);
router.use('/storeSeat', storeSeatRouter);
router.use('/resetSeats', resetSeatsRouter);


module.exports = router;
