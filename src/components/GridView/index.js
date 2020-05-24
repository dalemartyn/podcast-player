import React from 'react';
import { Link } from 'react-router-dom';
import { useAppState } from '../../AppStateProvider';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import PodcastImage from '../PodcastImage';

export default function GridView({ category }) {
  useDocumentTitle(category.title);
  const { podcasts } = useAppState();

  const podcastGridItems = category.podcasts.map(function(url) {
    const podcast = podcasts.byUrl[url];
    return <PodcastGridItem podcast={podcast} key={podcast.url} />
  });

  return (
    <GridLayout title={category.title}>
      {podcastGridItems}
    </GridLayout>
  );
}

function GridLayout({ title, children }) {
  return (
    <>
      <h1 className="ts-page-title u-margin-bottom-xxlarge">{title}</h1>
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
