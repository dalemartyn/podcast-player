import React from 'react';
import { Link } from 'react-router-dom';
import { useAppState } from '../AppStateProvider';

export default function HomeView() {
  const { podcasts } = useAppState();

  const podcastGridItems = podcasts.allUrls.map(function(url) {
    const podcast = podcasts.byUrl[url];
    return <PodcastGridItem podcast={podcast} key={podcast.url} />
  });

  return (
    <HomeLayout>
      {podcastGridItems}
    </HomeLayout>
  );
}

function HomeLayout({ children }) {
  return (
    <>
      <h1 className="ts-page-title u-margin-bottom-xxlarge">Podcasts</h1>
      <ul className="c-podcast-grid">
        {children}
      </ul>
    </>
  );
}

function PodcastGridItem({ podcast }) {

  return (
    <li className="c-podcast-grid__item">
      <div className="o-ratio o-ratio--1:1">
        <Link
          to={{
            pathname: '/podcast',
            search: `?rss=${encodeURIComponent(podcast.url)}`
          }}
          className="c-podcast-grid__link o-ratio__content"
        >
          <img src={podcast.image} alt={podcast.title} />
        </Link>
      </div>
      <h2 className="ts-display-5 u-margin-top-small">
        {podcast.title || podcast.url}
      </h2>
    </li>
  );
}
