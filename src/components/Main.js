import React from 'react';
import Feed from './Feed';
import Home from './Home';
import { useAppState, useAppDispatch } from '../AppStateProvider';
import useBrowserHistory from '../hooks/useBrowserHistory';

export default function Main() {
  const { feed, player, route } = useAppState();
  const dispatch = useAppDispatch();
  useBrowserHistory(route);

  let main;

  if (route.path === '/') {
    main = <Home dispatch={dispatch} />;
  } else if (route.path === '/feed') {
    main = <Feed feed={feed} route={route} player={player} dispatch={dispatch} />;
  } else {
    main = <NotFound route={route} />;
  }

  return (
    <MainLayout>
      {main}
    </MainLayout>
  );
}

function MainLayout({ children }) {
  return (
    <div className="o-wrapper-l u-padding-vertical-xxlarge u-margin-bottom-xlarge">
      {children}
    </div>
  );
}

function NotFound({ route }) {
  return (
    <>
      <h1 className="ts-page-title u-margin-bottom-xxlarge">404</h1>
      <p>The <code>{route.path}</code> route couldn’t be found.</p>
    </>
  )
}
