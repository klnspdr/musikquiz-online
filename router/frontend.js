let express = require('express');
let router = express.Router();

let index = require('./frontend/index');
let admin = require('./frontend/admin');

router.use('/', index);
router.use('/admin', admin);



module.exports = router;
