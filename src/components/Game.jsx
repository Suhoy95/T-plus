import React, { Component } from 'react';

import { Link } from 'react-router-dom';

export default class Game extends Component {
  constructor() {
    super();
    this.state = {
      score: 0,
      time: 5 * 60,
    };
  }

  render() {
    return (
      <div>
        Game
        <Link to="/">Назад</Link>
      </div>
    );
  }
}
