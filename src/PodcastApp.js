import React from 'react';
import Main from './components/Main';
import Playbar from './components/Playbar';
import Header from './components/Header';
import AppStateProvider from './AppStateProvider';

function PodcastApp() {
  return (
    <AppStateProvider>
      <Header />
      <Main />
      <Playbar />
    </AppStateProvider>
  );
}

export default PodcastApp;
