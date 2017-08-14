import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import BurgerButton from './BurgerButton';
import Scene from './Scene';
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

  componentDidMount() {
    window.svgClick = this.onSvgClick.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    window.svgClick = this.onSvgClick.bind(this);
  }

  componentWillUnmount() {
    clearInterval(this.tickInterval);
  }

  get defaultState() {
    return {
      score: 0,
      time: 5 * 60,
      stage: Stages.Rules,
      scale: 0,

      id: 0,

      cable: false,
      'coffee-maker': false,
      extension_cable: false,
      hoover: false,
      hoover_2: false,
      lamp_in_corridor: false,
      lamp_near_bad: false,
      lamp_near_mirror: false,
      pc_back: false,
      pc_face: false,
      stove: false,
    };
  }

  onSvgClick(event) {
    this.addScore.call(this, event, 'cable');
    this.addScore.call(this, event, 'coffee-maker');
    this.addScore.call(this, event, 'extension_cable');
    this.addScore.call(this, event, 'hoover');
    this.addScore.call(this, event, 'hoover_2');
    this.addScore.call(this, event, 'lamp_in_corridor');
    this.addScore.call(this, event, 'lamp_near_bad');
    this.addScore.call(this, event, 'lamp_near_mirror');
    this.addScore.call(this, event, 'pc_back');
    this.addScore.call(this, event, 'pc_face');
    this.addScore.call(this, event, 'stove');

    if (this.state.cable &&
        this.state['coffee-maker'] &&
        this.state.extension_cable &&
        this.state.hoover &&
        this.state.hoover_2 &&
        this.state.lamp_in_corridor &&
        this.state.lamp_near_bad &&
        this.state.lamp_near_mirror &&
        this.state.pc_back &&
        this.state.pc_face &&
        this.state.stove) {
      this.setState({ stage: Stages.EndGame });
    }
  }

  addScore(event, className) {
    if (!event.path) {
      return;
    }
    let el = event.path.find(n => n.classList && n.classList.contains(className));
    if (el) {
      el.style.display = 'none';
      if (!this.state[className]) {
        this.score += 10;
      }
      this.setState({ [className]: true });
    }
  }

  get sceneSize() {
    return {
      height: `${98 + 20 * this.state.scale}%`,
    };
  }

  get score() {
    return this.state.score;
  }

  set score(value) {
    this.setState({ score: value });
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
    this.setState({
      stage: Stages.Game,
      id: this.state.id + 1,
    });
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
      <div className="Game">
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
          <div className="Grid-left">
            <Scene style={this.sceneSize} id={this.state.id} stage={this.state.stage} />
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
            <div className={`img ${this.state.cable ? 'gray' : ''}`}>
              <img src="img/items/cable.svg" alt="Провод" />
            </div>
            <div className={`img ${this.state['coffee-maker'] ? 'gray' : ''}`}>
              <img src="img/items/coffee-maker.svg" alt="Кофе-машина" />
            </div>
            <div className={`img ${this.state.extension_cable ? 'gray' : ''}`}>
              <img src="img/items/extension_cable.svg" alt="Удлинитель" />
            </div>
            <div className={`img ${this.state.hoover ? 'gray' : ''}`}>
              <img src="img/items/hoover.svg" alt="Пылесос" />
            </div>
            <div className={`img ${this.state.hoover_2 ? 'gray' : ''}`}>
              <img src="img/items/hoover_2.svg" alt="Пылесос(2)" />
            </div>
            <div className={`img ${this.state.lamp_in_corridor ? 'gray' : ''}`}>
              <img src="img/items/lamp_in_corridor.svg" alt="Лампа в корридоре" />
            </div>
            <div className={`img ${this.state.lamp_near_bad ? 'gray' : ''}`}>
              <img src="img/items/lamp_near_bad.svg" alt="Лампа у кровати" />
            </div>
            <div className={`img ${this.state.lamp_near_mirror ? 'gray' : ''}`}>
              <img src="img/items/lamp_near_mirror.svg" alt="Лампа у зеркала" />
            </div>
            <div className={`img ${this.state.pc_back ? 'gray' : ''}`}>
              <img src="img/items/pc_back.svg" alt="Компьютер, задняя панель" />
            </div>
            <div className={`img ${this.state.pc_face ? 'gray' : ''}`}>
              <img src="img/items/pc_face.svg" alt="Компьютер, передняя панель" />
            </div>
            <div className={`img ${this.state.stove ? 'gray' : ''}`}>
              <img src="img/items/stove.svg" alt="Плита" />
            </div>
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
