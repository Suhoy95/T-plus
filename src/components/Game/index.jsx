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

const defaultState = {
  score: 0,
  time: 5 * 60,
  stage: Stages.Rules,
  scale: 0,

  timeIsOut: true,
  showRightPanel: true,

  id: 0,

  cable: false,
  'coffee-maker': false,
  extension_cable: false,
  hoover: false,
  hoover_2: false,
  lamp_in_corridor: false,
  lamp_near_bad: false,
  lamp_near_mirror: false,
  'pan-item': false,
  pc_back: false,
  pc_face: false,
  powerbank: false,
  stove: false,
  window: false,
};

/**
 * @param {HTMLElement} node
 */
function hide(node) {
  node.style.display = 'none';
}

function hideStuff(className) {
  document.querySelectorAll(`.${className}`).forEach(hide);
}

function hideAllStuff(map) {
  Object.keys(map)
        .filter(key => map[key])
        .forEach(hideStuff);
}

export default class Game extends Component {
  constructor() {
    super();
    this.state = defaultState;
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

  onSvgClick(event) {
    this.addScore.call(this, event, 'cable');
    this.addScore.call(this, event, 'coffee-maker');
    this.addScore.call(this, event, 'extension_cable');
    this.addScore.call(this, event, 'hoover');
    this.addScore.call(this, event, 'hoover_2');
    this.addScore.call(this, event, 'lamp_in_corridor');
    this.addScore.call(this, event, 'lamp_near_bad');
    this.addScore.call(this, event, 'lamp_near_mirror');
    this.addScore.call(this, event, 'pan-item');
    this.addScore.call(this, event, 'pc_back');
    this.addScore.call(this, event, 'pc_face');
    this.addScore.call(this, event, 'powerbank');
    this.addScore.call(this, event, 'stove');
    this.addScore.call(this, event, 'window');

    if (this.state.cable &&
        this.state['coffee-maker'] &&
        this.state.extension_cable &&
        this.state.hoover &&
        this.state.hoover_2 &&
        this.state.lamp_in_corridor &&
        this.state.lamp_near_bad &&
        this.state.lamp_near_mirror &&
        this.state['pan-item'] &&
        this.state.pc_back &&
        this.state.pc_face &&
        this.state.powerbank &&
        this.state.stove &&
        this.state.window
      ) {
      this.setState({
        stage: Stages.EndGame,
        timeIsOut: false,
      });
      clearInterval(this.tickInterval);
    }
  }

  addScore(event, className) {
    if (!event.path) {
      return;
    }
    const node = event.path.find(n => n.classList && n.classList.contains(className));
    if (node) {
      hideStuff(className);
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
    if (value < 0 || value > 10) {
      return;
    }
    this.setState({ scale: value });
    this.restoreScene();
  }

  start() {
    this.setState({
      stage: Stages.Game,
      id: this.state.id + 1,
      showRightPanel: false,
    });
    this.restoreScene();
    this.tickInterval = setInterval(this.tick, 1000);
  }

  pause() {
    clearInterval(this.tickInterval);
    this.setState({ stage: Stages.Pause });
  }

  restart() {
    this.setState(defaultState);
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

  restoreScene() {
    setTimeout(hideAllStuff, 500, {
      cable: this.state.cable,
      'coffee-maker': this.state['coffee-maker'],
      extension_cable: this.state.extension_cable,
      hoover: this.state.hoover,
      hoover_2: this.state.hoover_2,
      lamp_in_corridor: this.state.lamp_in_corridor,
      lamp_near_bad: this.state.lamp_near_bad,
      lamp_near_mirror: this.state.lamp_near_mirror,
      'pan-item': this.state['pan-item'],
      pc_back: this.state.pc_back,
      pc_face: this.state.pc_face,
      powerbank: this.state.powerbank,
      stove: this.state.stove,
      window: this.state.window,
    });
  }

  render() {
    return (
      <div className="Game">
        <div className="Header">
          <div className="Grid-left">
            <img src="img/logo.png" className="Header--logo" alt="t+" />
            <div className="Header--InfoItem" title="Счет">
              <h2>Очки:</h2>
              <span>{this.state.score}</span>
            </div>
            <div className="Header--InfoItem" title="Оставшееся время">
              <h2>Оставшееся время:</h2>
              <span>{this.time}</span>
            </div>
          </div>
          <div className="Grid-right">
            <BurgerButton onClick={this.pause} />
          </div>
        </div>
        <div className="Body">
          <div className={`Grid-left ${this.state.showRightPanel ? '' : 'closed'}`}>
            <Scene
              className={`Grid-left ${this.state.showRightPanel ? '' : 'closed'}`}
              style={this.sceneSize} id={this.state.id} stage={this.state.stage}
            />
            <button
              className={`GameScene--tip-button ${this.state.showRightPanel ? '' : 'closed'}`}
              onClick={() => { this.setState({ showRightPanel: !this.state.showRightPanel }) }}
            > Подсказки </button>
            <button
              className={`GameScene--plus-scale ${this.state.showRightPanel ? '' : 'closed'}`}
              onClick={() => { this.scale += 1; }}
            />
            <button
              className={`GameScene--minus-scale ${this.state.showRightPanel ? '' : 'closed'}`}
              onClick={() => { this.scale -= 1; }}
            />
          </div>
          <div className={`Grid-right SearchList ${this.state.showRightPanel ? '' : 'closed'}`}>
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
            <div className={`img ${this.state['pan-item'] ? 'gray' : ''}`}>
              <img src="img/items/pan-item.svg" alt="" />
            </div>
            <div className={`img ${this.state.pc_back ? 'gray' : ''}`}>
              <img src="img/items/pc_back.svg" alt="Компьютер, задняя панель" />
            </div>
            <div className={`img ${this.state.pc_face ? 'gray' : ''}`}>
              <img src="img/items/pc_face.svg" alt="Компьютер, передняя панель" />
            </div>
            <div className={`img ${this.state.powerbank ? 'gray' : ''}`}>
              <img src="img/items/powerbank.svg" alt="Компьютер, передняя панель" />
            </div>
            <div className={`img ${this.state.stove ? 'gray' : ''}`}>
              <img src="img/items/stove.svg" alt="Плита" />
            </div>
            <div className={`img ${this.state.window ? 'gray' : ''}`}>
              <img src="img/items/window.svg" alt="Плита" />
            </div>
          </div>
        </div>
        {
          this.state.stage === Stages.Rules ?
            <div className="Shadow">
              <div className="Rules--tip">
                <h2>Правила</h2>
                <p>
                  Помогите семье из 4 человек начать экономить деньги на электроэнергии.
                  Вам необходимо внимательно посмотреть какие электроприборы не используются в
                  данный момент и могут быть отключены. После того как вы обнаружите такой
                  электроприбор просто кликните на него или нажмите пальцем, он отключиться и Вам
                  начислятся баллы. Если вы сомневаетесь или не видите какие еще электроприборы
                  можно отключть нажмите на кнопку с подсказками.
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
                  <button style={{ marginTop: '2vh' }} className="Pause--button" onClick={this.restart}>
                    Заново
                  </button>
                  <Link className="Pause--button" to="/">
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
                <h1>{this.state.timeIsOut ? 'Время вышло' : 'Вы нашли все утечки электричества'}</h1>
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
