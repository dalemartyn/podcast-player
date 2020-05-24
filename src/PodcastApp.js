import React from 'react';
import AppStateProvider from './AppStateProvider';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import Playbar from './components/Playbar';
import SiteHeader from './components/SiteHeader';
import PodcastView from './components/PodcastView';
import HomeView from './components/HomeView';
import GridView from './components/GridView';
import NotFound from './components/NotFound';
import MainLayout from './components/MainLayout';

function scrollToTop() {
  window.scrollTo(0, 0);
}

function PodcastApp() {
  return (
    <AppStateProvider>
      <BrowserRouter>
        <SiteHeader />
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
              path="/web"
              element={<GridView category="web" />}
              preload={scrollToTop}
            />
            <Route
              path="/business"
              element={<GridView category="business" />}
              preload={scrollToTop}
            />
            <Route
              path="/football"
              element={<GridView category="football" />}
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
