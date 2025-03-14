import React from 'react';
import CreateRoom from '../components/CreateRoom';
import JoinRoom from '../components/JoinRoom';
import '../styles/home.css';


function Home() {
    return (
        <div className='home'>
            <div className='home-buttons'>
                <CreateRoom />
                <JoinRoom />
            </div>
        </div>
    )
}

export default Home;
