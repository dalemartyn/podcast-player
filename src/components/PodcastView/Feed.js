import React from 'react';
import Spinner from '../Spinner';
import FeedItem, { isInPlayer } from './FeedItem';
import {
  useAppState,
  useAppDispatch
} from '../../AppStateProvider';
import { getPodcast } from '../../reducers/podcasts';

export default function Feed({ podcastUrl, podcastMeta }) {

  const { podcasts, player } = useAppState();

  const dispatch = useAppDispatch();

  function playPodcast(episode) {
    if (isInPlayer(episode, player)) {
      dispatch({
        type: 'PLAY_PODCAST'
      });
    } else {
      dispatch({
        type: 'LOAD_PODCAST',
        data: {
          episode,
          podcastMeta
        }
      });
    }
  }

  function pausePodcast() {
    dispatch({
      type: 'PAUSE_PODCAST'
    });
  }

  const podcast = getPodcast(podcasts, podcastUrl);

  if ( podcast && podcast.episodes ) {
    return podcast.episodes.map((episode) => <FeedItem
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
