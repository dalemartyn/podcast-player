import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  useAppState
} from '../../AppStateProvider';
import Feed from './Feed';


export default function PodcastView() {
  const location = useLocation();
  const { podcasts } = useAppState();
  const params = new URLSearchParams(location.search);
  const podcastUrl = params.get('rss');

  const title = getPodcastTitle(podcastUrl, podcasts);

  // TODO: handle error case.

  return (
    <>
      <Title title={title} />
      <Feed podcastUrl={podcastUrl} />
    </>
  );

  // return (<><p>something went wrong</p><pre>{JSON.stringify(feed)}</pre></>);

}

function Title({title}) {
  return (
    <h1 className="ts-post-title u-margin-bottom-xxlarge">{ title }</h1>
  );
}

function getPodcastTitle(url, podcasts) {
  if (podcasts.byUrl[url]) {
    return podcasts.byUrl[url].title;
  }
  return null;
}
