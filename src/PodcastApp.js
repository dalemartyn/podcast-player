import React from 'react';
import AppStateProvider from './AppStateProvider';
import PodcastAppRouter from './components/PodcastAppRouter';

function PodcastApp() {
  return (
    <AppStateProvider>
      <PodcastAppRouter />
    </AppStateProvider>
  );
}

export default PodcastApp;
