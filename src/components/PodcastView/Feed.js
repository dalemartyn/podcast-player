import React from 'react';
import Spinner from '../Spinner';
import FeedItem, { isInPlayer } from './FeedItem';
import {
  useAppState,
  useAppDispatch
} from '../../AppStateProvider';
import { useAudioElement } from '../../AudioElementProvider';
import { getPodcast } from '../../reducers/podcasts';

export default function Feed({ podcastUrl, podcastMeta }) {
  const { podcasts, player } = useAppState();
  const audioElement = useAudioElement();

  const dispatch = useAppDispatch();

  function playPodcast(episode) {
    const audio = audioElement.current;

    if (!isInPlayer(episode, player)) {
      const src = episode.media.url;
      audio.src = src;

      dispatch({
        type: 'PLAYER_LOAD_EPISODE',
        data: {
          episode,
          podcastMeta
        }
      });
    }

    audio.play()
      .catch(e => console.log('playing failed or was interrupted'));;
  }

  function pausePodcast() {
    const audio = audioElement.current;
    audio.pause();
  }

  const podcast = getPodcast(podcasts, podcastUrl);

  if ( podcast && podcast.episodes ) {
    return podcast.episodes.map((episode) => (
        <FeedItem
          episode={episode}
          key={episode.guid}
          player={player}
          onPlayButtonClick={() => playPodcast(episode) }
          onPauseButtonClick={() => pausePodcast(episode) }
        />
      )
    );
  } else {
    return <Spinner / > ;
  }
};
