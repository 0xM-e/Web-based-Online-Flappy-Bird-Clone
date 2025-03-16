import React, { Component } from 'react';
import { CANVAS_REF, CANVAS_HEIGHT, CANVAS_WIDTH } from '../utils/constants';
import '../styles/rooms.css';
import { Game } from '../game';

export default class Rooms extends Component {

  game = null;

  state = {
    messages: [
      { text: 'Hello', sender: 'user2' },
    ],
    newMessage: '',
  };

  handleMessageChange = (e) => {
    this.setState({ newMessage: e.target.value });
  };

  handleSendMessage = () => {
    if (this.state.newMessage.trim()) {
      const newMessage = {
        text: this.state.newMessage,
        sender: 'user1',
      };
      this.setState((prevState) => ({
        messages: [...prevState.messages, newMessage],
        newMessage: '',
      }));
    }
  };



  start = async () => {
    if (this.game === null)
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
      <div className='room-container'>
        <div className="game-wrapper">
          <div className="room-view">
            <h3 className="room-title">Room Name</h3>

            <h4 className="section-title">Players</h4>
            <ul className="player-list">
              <li>Player 1</li>
              <li>Player 2</li>
            </ul>

            <h4 className="section-title">Player Scores</h4>
            <ul className="score-list">
              <li>
                <span>Player 1</span> <span className="score">200</span>
              </li>
              <li>
                <span>Player 2</span> <span className="score">500</span>
              </li>
            </ul>
            <div className="game-buttons">
              <button className="game-button start-button" onClick={this.start}>START</button>
              <button className="game-button" onClick={this.restart}>RESTART</button>
              <button className="game-button leave-button">LEAVE</button>
            </div>
          </div>


          {/* Canvas */}
          <div className="game-canvas-container">
            <canvas
              ref={CANVAS_REF}
              height={CANVAS_HEIGHT}
              width={CANVAS_WIDTH}
            ></canvas>
          </div>

          {/* Chat Section */}
          <div className="chat-wrapper">
            <section className="chat-header"> Chat</section>
            {/* Chat Messages */}
            <div className="chat-messages">
              {this.state.messages.map((message, index) => (
                <div
                  key={index}
                  className={`message-item ${message.sender === 'user1' ? 'isSender' : ''}`}
                >
                  {message.sender !== 'user1' && (
                    <img
                      src="/assets/redbird-downflap.png"
                      alt="User Profile"
                      className="message-avatar"
                    />
                  )}
                  <div className="message-text">{message.text}</div>
                  {message.sender === 'user1' && (
                    <img
                      src="/assets/bluebird-downflap.png"
                      alt="User Profile"
                      className="message-avatar"
                    />
                  )}
                </div>

              ))}
            </div>

            {/* Message Input */}
            <div className="chat-input-wrapper">
              <input
                type="text"
                value={this.state.newMessage}
                onChange={this.handleMessageChange}
                className="chat-input"
                placeholder="Type a message..."
              />
              <button
                onClick={this.handleSendMessage}
                className="send-message-button"
              >
                Send
              </button>
            </div>
          </div>

        </div>
      </div >
    );
  }
}
