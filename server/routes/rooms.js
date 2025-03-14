var express = require('express');
var router = express.Router();

let { rooms } = require('../services/data');

router.get('/', function (req, res, next) {
    const roomNames = Object.keys(rooms).map(roomName => ({
        name: roomName,
        playerCount: rooms[roomName].playerCount
    }));
    res.json({
        status: 'success',
        data: roomNames,
        message: 'All room names have been successfully sent.'
    });

});

router.get('/:roomName', function (req, res, next) {
    const roomName = req.params.roomName;
    res.json(roomName);
})

router.post('/create', function (req, res, next) {
    let { roomName } = req.body;

    roomName = roomName.trim();

    if (!roomName) {
        return res.status(400).json({ error: 'Enter a valid room name' });
    }

    if (rooms.hasOwnProperty(roomName)) {
        return res.status(400).json({ error: `Room '${roomName}' already exists.` });
    }

    rooms[roomName] = {
        players: [],
        playerCount: 0,
        gameState: false,
        winner: null
    };
    console.log(rooms);
    return res.status(201).json({ message: `Room '${roomName}' successfully created.` });
});

module.exports = router;