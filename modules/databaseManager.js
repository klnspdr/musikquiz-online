const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const lodashId = require('lodash-id')
const path = require('path');

const adapter = new FileSync(path.join(__dirname, '../db.json'));
const db = low(adapter)
db._.mixin(lodashId)

// init db
db.defaults({ scores: [] })
    .write()

//get scores sort by descending score
function getScores(){
    return db._.orderBy(db.get('scores')
        .value(), 'score', 'desc')
}

module.exports.getScores = getScores;

function addTeam (name){
    // Add a post
    return team = db.get('scores')
        .insert({name: name, score: 0})
        .write()
}
module.exports.addTeam = addTeam;

function removeTeam (id){
    //remove team from db
    return team = db.get('scores')
        .remove({id: id})
        .write()
}
module.exports.removeTeam = removeTeam;

 function addPoint (id) {
    //get old score
     const oldScore = db.get('scores').find({id: id}).value().score;

    //update dataset in db
    return db.get('scores')
        .find({id: id})
        .assign({score:oldScore + 1})
        .write()
}
module.exports.addPoint = addPoint;

function retractPoint (id) {
    //get old dataset
    const oldDataset = db.get('scores').find({id: id}).value();

    //check if oldDataset.score is greater than 0, if so, update dataset in db, else return old dataset
    if(oldDataset.score > 0){
        //update dataset in db
        return db.get('scores')
            .find({id: id})
            .assign({score:oldDataset.score - 1})
            .write()
    } else {
        return oldDataset
    }
}
module.exports.retractPoint = retractPoint;

function resetScores(){
    let teams = db.get('scores').value();

    let resetTeams = teams.map((team) => {
        return {
            id: team.id,
            name: team.name,
            score: 0
        }
    })
    return db.set('scores', resetTeams)
        .write()
}

module.exports.resetScores = resetScores;
