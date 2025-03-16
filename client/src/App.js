import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Rooms from './pages/Rooms';
import Home from './pages/Home';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/room/:roomName" element={<Rooms />} />
      </Routes>
    </div>
  );
};

export default App;
