const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const lodashId = require('lodash-id')
const path = require('path');

const adapter = new FileSync(path.join(__dirname, '../db.json'));
const db = low(adapter)
db._.mixin(lodashId)

// init db
db.defaults({
    scores: [],
    seats: [
        {
            sessionId: 1234,
            seats: {l: " ", m: " ", r: " "}
        }],
    solutions: [
        {
            sessionId: 1234,
            solutions: {l: " ", m: " ", r: " "}
        }
    ]

})
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

function removeTeam (id, number){
    //remove team from db
    return team = db.get('scores')
        .remove({id: id})
        .write()
}
module.exports.removeTeam = removeTeam;

 function addPoint (id, number) {
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

function getSeats(sessionId) {
    return db.get('seats').find({sessionId: sessionId}).value().seats;
}

module.exports.getSeats = getSeats;

function storeSeat(sessionId, seatValue, name) {

    const seats = getSeats(sessionId)
    if(seatValue === 1){
        if(seats["l"] === " "){
            seats["l"] = name;
        } else if (seats["r"] === " "){
            seats["r"] = name;
        }
    } else if (seatValue === 2){
        if(seats["m"] === " "){
            seats["m"] = name;
        }

    }
    db.get('seats')
        .find({sessionId: sessionId})
        .assign({seats: seats})
        .write()

}

module.exports.storeSeat = storeSeat;

function resetSeat(sessionId, name) {
    const seats = getSeats(sessionId)
    if(seats["l"] === name) {
        seats["l"] = " ";
    } else if(seats["m"] === name) {
        seats["m"] = " ";
    } else if(seats["r"] === name) {

        seats["r"] = " ";
    }

    db.get('seats')
        .find({sessionId: sessionId})
        .assign({seats: seats})
        .write()
}

module.exports.resetSeat = resetSeat;

function resetSeats (sessionId) {


    const seats = {l: " ",m: " ",r: " "};
    db.get('seats')
        .find({sessionId: sessionId})
        .assign({seats: seats})
        .write()

}
module.exports.resetSeats = resetSeats;

function getSolutions(sessionId) {
    return db.get('solutions').find({sessionId: sessionId}).value().solutions;
}
module.exports.getSolutions = getSolutions;

function storeSolutions(sessionId, solutions) {
    db.get('seats')
        .find({sessionId: sessionId})
        .assign({solutions: solutions})
        .write()
}
module.exports.storeSolutions = storeSolutions;

function resetSolutions(sessionId) {
    const solutions = {l: " ",m: " ",r: " "};
    db.get('solutions')
        .find({sessionId: sessionId})
        .assign({solutions: solutions})
        .write()
}
module.exports.resetSolutions = resetSolutions;
