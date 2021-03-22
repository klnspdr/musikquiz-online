let express = require('express');
let router = express.Router();
let { getScores, addTeam, removeTeam, addPoint, retractPoint, resetScores } = require('../../modules/databaseManager');

router.get('/', function (req,res,next) {
    res.send(getScores());
});

router.post('/team', function (req, res){
    res.send(addTeam(req.body.name));
})

router.delete('/team/:id', function (req, res){
    res.send(removeTeam(req.params.id));
})

router.get('/addPoint/:id', function (req,res,next) {
    res.send(addPoint(req.params.id));
})

router.get('/retractPoint/:id', function (req,res,next) {
    res.send(retractPoint(req.params.id));
})

router.get('/reset', function (req,res,next) {
    res.send(resetScores());
})

module.exports = router;
