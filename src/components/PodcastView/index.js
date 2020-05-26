import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  useAppState
} from '../../AppStateProvider';
import Feed from './Feed';
import PodcastHeader from './PodcastHeader';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import usePodcast from '../../hooks/usePodcast';
import {
  getPodcastMeta,
  getPodcastErrorMessage,
  getPodcastIsFetching
} from '../../reducers/podcasts';

export default function PodcastView() {
  const location = useLocation();
  const { podcasts } = useAppState();
  const params = new URLSearchParams(location.search);
  const podcastUrl = params.get('rss');
  usePodcast(podcastUrl);

  const podcastMeta = getPodcastMeta(podcasts, podcastUrl);
  const errorMessage = getPodcastErrorMessage(podcasts, podcastUrl);
  const isFetching = getPodcastIsFetching(podcasts, podcastUrl);

  useDocumentTitle(podcastMeta && podcastMeta.title);

  if (errorMessage && !isFetching) {
    return (
      <div className="u-margin-bottom-xxlarge">
        <h1 className="ts-post-title u-text-center u-margin-bottom">Something went wrong.</h1>
        <p className="u-text-center">The podcast feed couldn’t be loaded.</p>
      </div>
    );
  }

  return (
    <>
      { podcastMeta && <PodcastHeader podcastMeta={podcastMeta} />}
      <Feed podcastUrl={podcastUrl} podcastMeta={podcastMeta} />
    </>
  );

}
