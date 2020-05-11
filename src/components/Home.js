import React from 'react';
import podcasts from '../podcasts.json';
import { Link } from 'react-router-dom';

export default function Home() {

  const podcastGridItems = podcasts.map(function(podcast) {
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
