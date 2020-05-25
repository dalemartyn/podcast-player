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

  function playPodcast(episode) {
    dispatch({
      type: 'PLAY_PODCAST',
      data: {
        episode,
        podcastUrl
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
      onPlayButtonClick={() => playPodcast(episode) }
      onPauseButtonClick={() => pausePodcast(episode) } />
    );
  } else {
    return <Spinner / > ;
  }
};
