import React from 'react';
import Spinner from '../Spinner';
import FeedItem from './FeedItem';
import {
  useAppState,
  useAppDispatch
} from '../../AppStateProvider';

export default function Feed({ podcastUrl }) {

  const { episodes, player } = useAppState();

  const dispatch = useAppDispatch();

  function playPodcast(podcastUrl) {
    dispatch({
      type: 'PLAY_PODCAST',
      data: {
        url: podcastUrl
      }
    });
  }

  function pausePodcast() {
    dispatch({
      type: 'PAUSE_PODCAST'
    });
  }

  const feed = episodes.byUrl[podcastUrl];

  if ( feed ) {
    return feed.map((episode) => <FeedItem
      episode={episode}
      key={episode.guid}
      player={player}
      onPlayButtonClick={() => playPodcast(episode.media.url) }
      onPauseButtonClick={() => pausePodcast(episode.media.url) } />
    );
  } else {
    return <Spinner / > ;
  }
};
