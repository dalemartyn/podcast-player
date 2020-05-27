import React from 'react';
import AppStateProvider from './AppStateProvider';
import AudioElementProvider from './AudioElementProvider';
import PodcastAppRouter from './components/PodcastAppRouter';

function PodcastApp() {
  return (
    <AppStateProvider>
      <AudioElementProvider>
        <PodcastAppRouter />
      </AudioElementProvider>
    </AppStateProvider>
  );
}

export default PodcastApp;
