import React, { Component } from 'react';
import './App.css';
import { Game } from './game';
import { CANVAS_HEIGHT, CANVAS_WIDTH, CANVAS_REF } from './utils/constants';

class App extends Component {

  game = null;

  start = async () => {
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
        <div id='canvasDiv'>
          <canvas
            ref={CANVAS_REF}
            height={CANVAS_HEIGHT}
            width={CANVAS_WIDTH}
          ></canvas>

          <div style={{ textAlign: 'center' }}>
            <button id='startButton' className='gameButton' onClick={this.start}>START</button>
            <button className='gameButton' onClick={this.restart}>RESTART</button>
          </div>

        </div>
      </div >
    );
  }
}
export default App;
