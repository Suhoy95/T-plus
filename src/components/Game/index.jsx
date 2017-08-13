import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import BurgerButton from './BurgerButton';
import Social from './Social';

const Stages = {
  Rules: 'RULES',
  Game: 'GAME',
  Pause: 'PAUSE',
  EndGame: 'ENDGAME',
};

export default class Game extends Component {
  constructor() {
    super();
    this.state = this.defaultState;
    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
    this.restart = this.restart.bind(this);
    this.tick = this.tick.bind(this);
  }

  get defaultState() {
    return {
      score: 0,
      time: 60,
      stage: Stages.Rules,
      scale: 0,
    };
  }

  get sceneSize() {
    return {
      height: `${98 + 20 * this.state.scale}%`,
    };
  }

  get scale() {
    return this.state.scale;
  }
  set scale(value) {
    if (value < 0 || value > 5) {
      return;
    }
    this.setState({ scale: value });
  }

  start() {
    this.setState({ stage: Stages.Game });
    this.tickInterval = setInterval(this.tick, 1000);
  }

  pause() {
    clearInterval(this.tickInterval);
    this.setState({ stage: Stages.Pause });
  }

  restart() {
    this.setState(this.defaultState);
  }

  tick() {
    const nextTime = this.state.time - 1;
    if (nextTime < 0) {
      clearInterval(this.tickInterval);
      this.setState({ stage: Stages.EndGame });
      return;
    }
    this.setState({ time: nextTime });
  }

  get time() {
    const minutes = Math.floor(this.state.time / 60);
    const seconds = this.state.time % 60;
    return `${minutes}:${seconds < 10 ? 0 : ''}${seconds}`;
  }

  render() {
    return (
      <div>
        <div className="Header">
          <div className="Grid-left">
            <div className="Header--InfoItem" title="Счет">
              <img src="img/qwe.jpg" alt="Счет" />
              <span>{this.state.score}</span>
            </div>
            <div className="Header--InfoItem" title="Оставшееся время">
              <img src="img/qwe.jpg" alt="Оставшееся время" />
              <span>{this.time}</span>
            </div>
          </div>
          <div className="Grid-right">
            <BurgerButton onClick={this.pause} />
          </div>
        </div>
        <div className="Body">
          <div className="Grid-left GameScene">
            <img style={this.sceneSize} src="img/Full_scene.svg" alt="Игровое поле" />
            <button
              className="GameScene--plus-scale"
              onClick={() => this.scale += 1}
            />
            <button
              className="GameScene--minus-scale"
              onClick={() => this.scale -= 1}
            />
          </div>
          <div className="Grid-right SearchList">
            <img src="img/qwe.jpg" alt="Счет" />
            <img src="img/qwe.jpg" alt="Счет" />
            <img src="img/qwe.jpg" alt="Счет" />
            <img src="img/qwe.jpg" alt="Счет" />
            <img src="img/qwe.jpg" alt="Счет" />
            <img src="img/qwe.jpg" alt="Счет" />
            <img src="img/qwe.jpg" alt="Счет" />
          </div>
        </div>
        {
          this.state.stage === Stages.Rules ?
            <div className="Shadow">
              <div className="Rules--tip">
                <h2>Правила</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nulla quam velit, vulputate eu
                </p>
                <button className="Rules--tip--button" onClick={this.start}>
                  Понятно
                </button>
              </div>
            </div>
          : ''
        }
        {
          this.state.stage === Stages.Pause ?
            <div className="Shadow">
              <div className="Pause">
                <h1>Меню</h1>
                <div className="Pause--navbar">
                  <button className="Pause--button" onClick={this.start}>
                    Продолжить
                  </button>
                  <button className="Pause--button" onClick={this.restart}>
                    Заново
                  </button>
                  <Link style={{ marginTop: '30px' }} className="Pause--button" to="/">
                    Выход
                  </Link>
                </div>
              </div>
            </div>
          : ''
        }
        {
          this.state.stage === Stages.EndGame ?
            <div className="Shadow">
              <div className="EndGame">
                <h1>Время вышло</h1>
                <div className="EndGame--score">
                  Ваш выигрыш
                  <div>{this.state.score}</div>
                </div>
                <Social />
                <Link className="EndGame--button" to="/">
                  Завершить
                </Link>
              </div>
            </div>
          : ''
        }
      </div>
    );
  }
}
