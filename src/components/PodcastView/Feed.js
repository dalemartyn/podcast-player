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
        type: 'PLAYER_PLAY'
      });
    } else {
      dispatch({
        type: 'PLAYER_LOAD_EPISODE',
        data: {
          episode,
          podcastMeta
        }
      });
    }
  }

  function pausePodcast() {
    dispatch({
      type: 'PLAYER_PAUSE'
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
