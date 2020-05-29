import React from 'react';
import { useAppState } from '../AppStateProvider';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
import Playbar from './Playbar';
import SiteHeader from './SiteHeader';
import PodcastView from './PodcastView';
import HomeView from './HomeView';
import GridView from './GridView';
import NotFound from './NotFound';
import MainLayout from './MainLayout';

export default function PodcastAppRouter() {
  return (
    <BrowserRouter>
      <SiteHeader />
      <MainLayout>
        <PodcastAppRoutes />
      </MainLayout>
      <Playbar />
    </BrowserRouter>
  );
}

function PodcastAppRoutes() {
  const state = useAppState();
  const location = useLocation();

  const scrollToTop = () => {
    if (!(location.state && location.state.blockScrollToTop)) {
      window.scrollTo(0, 0);
    }
  }

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
  )
}
