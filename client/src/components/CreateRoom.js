import React, { useState } from 'react';
import '../styles/createRoom.css';

const CreateRoom = () => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [roomName, setRoomName] = useState('');

    const togglePopup = () => {
        setIsPopupVisible(!isPopupVisible);
    };

    return (
        <div>
            <button className='home-button' onClick={togglePopup}>Create Room</button>

            {isPopupVisible && (
                <div className="popup">
                    <div className="popup-content">
                        <span className="close" onClick={togglePopup}>&times;</span>
                        <h2>Create Room</h2>
                        <div className='create-room-container'>
                            <input
                                className='input-room-name'
                                type="text"
                                value={roomName}
                                onChange={(e) => setRoomName(e.target.value)}
                                placeholder='Enter a room name'
                                required
                            />
                        </div>
                        <div className='create-contaier'>
                            <button>Create</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateRoom;