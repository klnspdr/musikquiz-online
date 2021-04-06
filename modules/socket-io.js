let { getScores, addTeam, removeTeam, addPoint, retractPoint, resetScores, getSeats, resetSeats, getSolutions, storeSolutions, resetSolutions } = require('./databaseManager');
const evaluateSitdown = require('./evaluateSitdown');
const {getKeyByValue} = require("./helperFunctions");

let io;


module.exports.init = function (serverInstance) {

    io = require('socket.io')(serverInstance);

    io.on('connection', (socket) => {
        //send user last data set received
        socket.emit('update-scoreboard', getScores())
        socket.emit('update-seats', getSeats(1234))
        socket.emit('update-solutions', getSolutions(1234))

        console.log('a user connected');

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });

        //scoreboard  stuff

        socket.on('add-team', (name) => {
            addTeam(name);
            emitScoreboardUpdate();
        });

        socket.on('remove-team', (id) => {
            removeTeam(id);
            emitScoreboardUpdate();
        });

        socket.on('add-point', (data) => {
            addPoint(data.id, data.num);
            emitScoreboardUpdate();
        })

        socket.on('retract-point', (data) => {
            retractPoint(data.id, data.num);
            emitScoreboardUpdate();
        })

        socket.on('reset-scores', () => {
            resetScores()
            emitScoreboardUpdate();
        })


        //seat stuff
        socket.on('sitdown', (data) => {
            if(data.sessionId === "" || data.sessionId === undefined){
                data.sessionId = 1234;
            }
            if(evaluateSitdown(data, socket)) {
                //if user can sitdown, put him into room "sitting" for later purposes
                socket.join('sitting');
            }
            io.emit('update-seats', getSeats(data.sessionId))
        })

        socket.on('reset-seats', (data) => {
            if(data === undefined || data.sessionId === "" || data.sessionId === undefined) {
                data.sessionId = 1234;
            }
            resetSeats(data.sessionId);
            resetSolutions(data.sessionId);

            //clear room 'sitting'
            io.in('sitting').socketsLeave('sitting');

            io.emit('update-seats', getSeats(data.sessionId))
            io.emit('update-solutions', getSolutions(data.sessionId))
        })

        socket.on('ask-for-solution', (data) => {
            if(data === undefined || data.sessionId === "" || data.sessionId === undefined) {
                data.sessionId = 1234;
            }
            io.to('sitting').emit('enter-solution');
            io.emit('update-seats', getSeats(data.sessionId))
        })

        socket.on('submit-solution', (data) => {
            /*const dataModel = {
                sessionId,
                name,
                solution
            }*/
            if(data === undefined || data.sessionId === "" || data.sessionId === undefined) {
                data.sessionId = 1234;
            }

            let solutions = getSolutions(data.sessionId);
            const seats =  getSeats(data.sessionId)

            solutions[getKeyByValue(seats, data.name)] = data.solution;
            storeSolutions(data.sessionId, solutions)

            socket.leave('sitting');

            io.emit('update-solutions', solutions)
        })
    });



}
module.exports.getIo = () => {
    return io;
};

//functions to emit update events to all connected clients
function emitScoreboardUpdate() {
    io.emit('update-scoreboard', getScores())
}

function emitSeatUpdate(sessionId) {
    io.emit('update-seats', getSeats(sessionId))
}

module.exports.emitSeatUpdate = emitSeatUpdate;

