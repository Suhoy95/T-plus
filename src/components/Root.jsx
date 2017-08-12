import React from 'react';

import { HashRouter, Route } from 'react-router-dom';

import MainMenu from './MainMenu';
import About from './About';
import Game from './Game';

function Root() {
  return (
    <HashRouter>
      <div>
        <Route exact path="/" component={MainMenu} />
        <Route exact path="/about" component={About} />
        <Route exact path="/game" component={Game} />
      </div>
    </HashRouter>
  );
}

export default Root;
