import React, { useState } from 'react';
import '../styles/joinRoom.css';

const JoinRoom = () => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState('');
    const [rooms, setRooms] = useState([
        { id: 1, name: 'Room 1', playersCount: 3 },
        { id: 2, name: 'Room 2', playersCount: 5 },
        { id: 3, name: 'Room 3', playersCount: 2 },
        { id: 4, name: 'Room 4', playersCount: 4 },
        { id: 5, name: 'Room 5', playersCount: 6 },
        { id: 6, name: 'Room 6', playersCount: 1 },
        { id: 7, name: 'Room 7', playersCount: 8 },
        { id: 8, name: 'Room 8', playersCount: 7 },
        { id: 9, name: 'Room 9', playersCount: 3 },
        { id: 10, name: 'Room 10', playersCount: 2 },
        { id: 11, name: 'Room 11', playersCount: 4 },
        { id: 12, name: 'Room 12', playersCount: 6 },
    ]);

    const togglePopup = () => {
        setIsPopupVisible(!isPopupVisible);
    };

    const handleJoinRoom = () => {
        alert(`Joined Room: ${selectedRoom}`);
        setIsPopupVisible(false);
    };

    const handleRowClick = (roomName) => {
        setSelectedRoom(roomName);
    };

    return (
        <div>
            <button className='home-button' onClick={togglePopup}>Join a Room</button>

            {isPopupVisible && (
                <div className="popup">
                    <div className="popup-content">
                        <span className="close" onClick={togglePopup}>&times;</span>
                        <h2>Join a Room</h2>
                        <div className='find-room-container'>
                            <input className='input-room-name' placeholder='Room Name'></input>
                            <button className='find-button'>Find</button>
                        </div>
                        <div>
                            <table>
                                <thead>
                                    <tr>
                                        <th><button className='refresh-button'> Refresh</button></th>
                                        <th>Room Name</th>
                                        <th>Players</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rooms.map((room) => (
                                        <tr
                                            key={room.id}
                                            onClick={() => handleRowClick(room.name)}
                                            className={selectedRoom === room.name ? 'selected' : ''}
                                        >
                                            <td>{room.id}</td>
                                            <td>{room.name}</td>
                                            <td>{room.playersCount}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className='join-container'>
                            <button className='join-button' disabled={!selectedRoom} onClick={handleJoinRoom}>Join</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JoinRoom;
