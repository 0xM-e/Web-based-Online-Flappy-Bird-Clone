import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Game } from './game';
import Rooms from './pages/Rooms';
import Home from './pages/Home';


class App extends Component {


  state = {
    data: null
  }
  game = null;

  start = async () => {
    console.log(this.state.data.data);
    this.game = new Game();
    await this.game.init();
    this.loop();
  }

  restart = async () => {
    await this.game.init();
    this.loop();
  }

  loop = () => {
    if (!this.game.gameState) return;
    this.game.draw();
    this.game.update();
    requestAnimationFrame(this.loop);
  }

  render() {

    return (
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />}></Route >
          <Route path="/room/:roomName" element={<Rooms />} />
        </Routes>
      </div >
    );
  }
}
export default App;
