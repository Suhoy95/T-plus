

import React from 'react';
import { Link } from 'react-router-dom';

function MainMenu() {
  return (
    <div className="MainMenu">
      <h1>Меню</h1>
      <div className="MainMenu--navbar">
        <Link className="MainMenu--navbar--button" to="/game">
          Начать игру
        </Link>
        <Link className="MainMenu--navbar--button" to="/about">
          О компании
        </Link>
      </div>
    </div>
  );
}

export default MainMenu;
