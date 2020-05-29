import React from 'react';
import Spinner from '../Spinner';
import FeedItem from './FeedItem';
import {
  useAppState
} from '../../AppStateProvider';
import { useAudioElement } from '../../AudioElementProvider';
import { getPodcastEpisodes } from '../../reducers/podcasts';
import { isInPlayer } from '../../reducers/player';
import useLoadEpisode from '../../hooks/useLoadEpisode';

export default function Feed({ podcastUrl, podcastMeta }) {
  const { podcasts, player } = useAppState();
  const audioElement = useAudioElement();

  const load = useLoadEpisode();
  
  const play = function() {
    const audio = audioElement.current;
    audio.play()
      .catch(e => console.log('playing failed or was interrupted'));;
  }

  const pause = function() {
    const audio = audioElement.current;
    audio.pause();
  }

  const podcastEpisodes = getPodcastEpisodes(podcasts, podcastUrl);

  if (podcastEpisodes) {
    return podcastEpisodes.map((episode) => {
      let handlePlay;
      if (isInPlayer(player, episode)) {
        handlePlay = () => play(episode);
      } else {
        handlePlay = () => load(episode, podcastMeta);
      }

      return <FeedItem
        episode={episode}
        key={episode.guid}
        player={player}
        onPlayButtonClick={ handlePlay }
        onPauseButtonClick={() => pause(episode) }
      />;
    });
  } else {
    return <Spinner /> ;
  }
};
