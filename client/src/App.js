import React, { Component } from 'react';
import './App.css';
import { Game } from './game';
import CreateRoom from './components/CreateRoom';
import JoinRoom from './components/JoinRoom';


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
        <div className='app-buttons'>
          <CreateRoom />
          <JoinRoom />
        </div>
      </div >
    );
  }
}
export default App;
