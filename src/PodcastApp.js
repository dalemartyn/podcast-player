import React from 'react';
import AppStateProvider from './AppStateProvider';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import Playbar from './components/Playbar';
import Header from './components/Header';
import Feed from './components/Feed';
import Home from './components/Home';
import NotFound from './components/NotFound';
import MainLayout from './components/MainLayout';

function PodcastApp() {
  return (
    <AppStateProvider>
      <BrowserRouter>
        <Header />
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/podcast"
              element={<Feed />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MainLayout>
        <Playbar />
      </BrowserRouter>
    </AppStateProvider>
  );
}

export default PodcastApp;
