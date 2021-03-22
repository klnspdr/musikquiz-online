let express = require('express');
let router = express.Router();
let seatsRouter  = require('./api/seats');


router.use('/seats', seatsRouter);
router.use('/scoreboard', scoreboardRouter);


module.exports = router;
