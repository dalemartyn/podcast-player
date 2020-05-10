import React, { useEffect } from 'react';
import Feed from './Feed';
import Home from './Home';
import {
  useAppState,
  useAppDispatch
} from '../AppStateProvider';

export default function Main() {
  const { feed, player, route } = useAppState();
  const dispatch = useAppDispatch();
  let main;

  if (route.path === 'feed') {
    main = <Feed feed={feed} route={route} player={player} dispatch={dispatch} />;
  } else {
    main = <Home dispatch={dispatch} />;
  }

  useEffect(function scrollToTop() {
    document.documentElement.scrollTo(0, 0);
  }, [route.path]);

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
