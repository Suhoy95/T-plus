import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import BurgerButton from './BurgerButton';

export default class Game extends Component {
  constructor() {
    super();
    this.state = {
      score: 0,
      time: 5 * 60,
    };
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
            <BurgerButton />
          </div>
        </div>
        <div className="Body">
          <div className="Grid-left GameScene">
            <img src="img/Full_scene.svg" alt="Игровое поле" />
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
      </div>
    );
  }
}
