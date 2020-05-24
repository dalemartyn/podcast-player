import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  useAppState
} from '../../AppStateProvider';
import Feed from './Feed';
import PodcastHeader from './PodcastHeader';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import usePodcast from '../../hooks/usePodcast';

export default function PodcastView() {
  const location = useLocation();
  const { podcasts } = useAppState();
  const params = new URLSearchParams(location.search);
  const podcastUrl = params.get('rss');
  usePodcast(podcastUrl);

  const podcast = getPodcast(podcastUrl, podcasts);

  useDocumentTitle(podcast && podcast.title);

  // TODO: handle error case.

  return (
    <>
      { podcast && <PodcastHeader podcast={podcast} />}
      <Feed podcastUrl={podcastUrl} />
    </>
  );

}


function getPodcast(url, podcasts) {
  if (podcasts.byUrl[url]) {
    return podcasts.byUrl[url];
  }
  return null;
}
