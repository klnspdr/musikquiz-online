const {storeSeat, getSeats, resetSeat} = require('./databaseManager');

module.exports = (data, socket) => {
    let seatValue = parseInt(data.seat);
    let sessionId = parseInt(data.sessionId);
    let name = data.name;
    if (data.seat === undefined || data.name === undefined || data.seat === null || sessionId === undefined) {
        socket.emit('data-error');
        return false;
    } else if (seatValue < 1 || seatValue > 2) {
        socket.emit('data-error');
        return false;
    } else {
        const actSeats = getSeats(sessionId);
        if(seatValue === 1) {
            if ((actSeats.l !== " " && actSeats.r !== " ") || actSeats.l === name || actSeats.m === name || actSeats.r === name) {
                socket.emit('already-sitting');
                return false
            } else {
                storeSeat(sessionId, seatValue, name);
                socket.emit('sitdown-success')
                return true;
            }
        } else if (seatValue === 2) {
            if (actSeats.m !== " ") {

                socket.emit('already-sitting');
                return false;
            } else if(actSeats.r === name || actSeats.l === name){
                resetSeat(sessionId, name);
                storeSeat(sessionId,seatValue, name);

                socket.emit('sitdown-success');
                return true
            } else {
                storeSeat(sessionId, seatValue, name);

                socket.emit('sitdown-success')
                return true;
            }
        }
    }
}
