import React from 'react';
import { Link } from 'react-router-dom';
import { useAppState } from '../../AppStateProvider';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import PodcastImage from '../PodcastImage';

export default function GridView({ category }) {
  useDocumentTitle(category);
  const { podcasts } = useAppState();

  const podcastGridItems = podcasts.categories[category].map(function(url) {
    const podcast = podcasts.byUrl[url];
    return <PodcastGridItem podcast={podcast} key={podcast.url} />
  });

  return (
    <GridLayout>
      {podcastGridItems}
    </GridLayout>
  );
}

function GridLayout({ children }) {
  return (
    <>
      <h1 className="ts-page-title u-margin-bottom-xxlarge">Podcasts</h1>
      <ul className="c-podcast-grid u-margin-bottom-xlarge">
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
          <PodcastImage podcast={podcast} />
        </Link>
      </div>
      <h2 className="ts-display-5 u-margin-top-small u-break-word">
        {podcast.title || podcast.url}
      </h2>
    </li>
  );
}
