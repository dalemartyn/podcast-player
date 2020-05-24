import React from 'react';
import { useAppState } from '../AppStateProvider';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import Playbar from './Playbar';
import SiteHeader from './SiteHeader';
import PodcastView from './PodcastView';
import HomeView from './HomeView';
import GridView from './GridView';
import NotFound from './NotFound';
import MainLayout from './MainLayout';

function scrollToTop() {
  window.scrollTo(0, 0);
}

export default function PodcastAppRouter() {
  const state = useAppState();

  const categoryRoutes = state.podcasts.categories.map(category => {
    return (
      <Route
        path={'/' + category.slug}
        element={<GridView category={category} />}
        preload={scrollToTop}
        key={category.slug}
      />
    );
  });

  return (
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
          {categoryRoutes}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainLayout>
      <Playbar />
    </BrowserRouter>
  );
}
