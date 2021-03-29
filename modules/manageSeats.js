let seats ={1234: {l: " ",m: " ",r: " "}};


function getSeats (sessionId) {
    return seats[sessionId];
}

function storeSeat (sessionId, seatValue, name) {
    if(seatValue === 1){
        if(seats[sessionId]["l"] === " "){
            seats[sessionId]["l"] = name;
        } else if (seats[sessionId]["r"] === " "){
            seats[sessionId]["r"] = name;
        }
    } else if (seatValue === 2){
        if(seats[sessionId]["m"] === " "){
            seats[sessionId]["m"] = name;
        }
    }
}

function resetSeat(sessionId, name) {
    if(seats[sessionId]["l"] === name) {
        seats[sessionId]["l"] = " ";
    } else if(seats[sessionId]["m"] === name) {
        seats[sessionId]["m"] = " ";
    } else if(seats[sessionId]["r"] === name) {
        seats[sessionId]["r"] = " ";
    }
}

function resetSeats (sessionId) {
    seats = {1234: {l: " ",m: " ",r: " "}};
    return seats["1234"];
}

module.exports.getSeats = getSeats;
module.exports.storeSeat = storeSeat;
module.exports.resetSeats = resetSeats;
module.exports.resetSeat = resetSeat;
