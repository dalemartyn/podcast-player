import React from 'react';
import { Link } from 'react-router-dom';
import { useAppState } from '../../AppStateProvider';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import PodcastImage from '../PodcastImage';
import { getPodcastMeta } from '../../reducers/podcasts';

export default function GridView({ category }) {
  useDocumentTitle(category.title);
  const { podcasts } = useAppState();

  const podcastGridItems = category.podcasts.map(function(url) {
    const podcastMeta = getPodcastMeta(podcasts, url);
    return <PodcastGridItem podcastMeta={podcastMeta} key={url} />
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

function PodcastGridItem({ podcastMeta }) {

  return (
    <li className="c-podcast-grid__item">
      <Link
        to={{
          pathname: '/podcast',
          search: `?rss=${encodeURIComponent(podcastMeta.url)}`
        }}
        className="c-podcast-grid__link"
      >
        <PodcastImage podcastMeta={podcastMeta} />
      </Link>
      <h2 className="ts-display-5 u-margin-top-small u-break-word">
        {podcastMeta.title || podcastMeta.url}
      </h2>
    </li>
  );
}
