import React from 'react';
import ReactDOM from 'react-dom';
import './sass/main.scss';
import PodcastApp from './PodcastApp';
import 'focus-visible';
import * as DarkTheme from './dark-theme';

DarkTheme.init();

ReactDOM.render(
  <React.StrictMode>
    <PodcastApp />
  </React.StrictMode>,
  document.getElementById('root')
);
