let express = require('express');
let router = express.Router();
let seatsRouter  = require('./api/seats');
let scoreboardRouter  = require('./api/scoreboard');


router.use('/seats', seatsRouter);
router.use('/scoreboard', scoreboardRouter);


module.exports = router;
