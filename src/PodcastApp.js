import React from 'react';
import AppStateProvider from './AppStateProvider';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import Playbar from './components/Playbar';
import Header from './components/Header';
import PodcastView from './components/PodcastView';
import HomeView from './components/HomeView';
import NotFound from './components/NotFound';
import MainLayout from './components/MainLayout';

function scrollToTop() {
  window.scrollTo(0, 0);
}

function PodcastApp() {
  return (
    <AppStateProvider>
      <BrowserRouter>
        <Header />
        <MainLayout>
          <Routes>
            <Route
              path="/"
              element={<HomeView />}
              preload={scrollToTop}
            />
            <Route
              path="/podcast"
              element={<PodcastView />}
              preload={scrollToTop}
            />
            <Route
              path="/design"
              element={<HomeView />}
              preload={scrollToTop}
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
