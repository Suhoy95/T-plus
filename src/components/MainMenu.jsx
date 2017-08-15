

import React from 'react';
import { Link } from 'react-router-dom';

function MainMenu() {
  return (
    <div className="MainMenu">
      <h1>Меню</h1>
      <Link className="MainMenu--navbar--button" to="/game">
        Начать игру
      </Link>
      <p className="About--text">Всероссийский фестиваль энергосбережения #ВместеЯрче проводится при поддержке Минэнерго России, Минобрнауки России, Росмолодежи, ГК "Фонд содействия реформированию ЖКХ", Министерства культуры России, фонда «Росконгресс» и Т+</p>
    </div>
  );
}

export default MainMenu;
