let { rooms } = require("../services/data");

function addPlayerToRoom(data) {
    rooms[data.roomName]['players'].push(data.playerId);
}

function removePlayerFromRoom(data) {
    // rooms[data.roomName]['players'] = rooms[data.roomName].filter(id => id !== data.playerId);

    let index = rooms[data.roomName]['players'].indexOf(data.playerId);

    if (index !== -1) {
        rooms[data.roomName]['players'].splice(index, 1);
    }

    console.log(rooms[data.roomName]['players']);
}

module.exports = { addPlayerToRoom, removePlayerFromRoom };