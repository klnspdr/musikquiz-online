let { getScores, addTeam, removeTeam, addPoint, retractPoint, resetScores } = require('./databaseManager');
const {storeSeat, getSeats, resetSeat, resetSeats} = require('./manageSeats');

let io;

module.exports.init = function (serverInstance) {

    io = require('socket.io')(serverInstance);
    console.log("test");

    io.on('connection', (socket) => {
        //send user last data set received
        socket.emit('update-scoreboard', getScores())
        socket.emit('update-seats', getSeats(1234))

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
