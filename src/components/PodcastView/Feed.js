import React, { useEffect, useRef } from 'react';
import Spinner from '../Spinner';
import FeedItem from './FeedItem';
import {
  useAppState
} from '../../AppStateProvider';
import { useAudioElement } from '../../AudioElementProvider';
import { getPodcastEpisodes } from '../../reducers/podcasts';
import { isInPlayer } from '../../reducers/player';
import useLoadEpisode from '../../hooks/useLoadEpisode';
import { useLocation } from 'react-router-dom';

export default function Feed({ podcastUrl, podcastMeta }) {
  const { podcasts, player } = useAppState();
  const audioElement = useAudioElement();
  const activeFeedItem = useRef();

  useScrollToActiveFeedItem(activeFeedItem);

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
      let ref;
      if (isInPlayer(player, episode)) {
        handlePlay = () => play(episode);
        ref = activeFeedItem;
      } else {
        handlePlay = () => load(episode, podcastMeta);
        ref = null;
      }

      return <FeedItem
        episode={episode}
        key={episode.guid}
        activeFeedItemRef={ref}
        player={player}
        onPlayButtonClick={ handlePlay }
        onPauseButtonClick={() => pause(episode) }
      />;
    });
  } else {
    return <Spinner /> ;
  }
};

function useScrollToActiveFeedItem(activeFeedItem) {
  const location = useLocation();

  useEffect(function() {
    const scroll = (location.state && location.state.scrollToNowPlaying);

    if (scroll && activeFeedItem.current) {
      let t;
      const scrollingFromTop = !location.state.blockScrollToTop;

      function scrollToActiveItem() {
        window.scrollTo({
          top: activeFeedItem.current.offsetTop - 70,
          behavior: 'smooth'
        });
      }

      if (scrollingFromTop) {
        t = setTimeout(scrollToActiveItem, 750);
        return () => {
          clearTimeout(t);
        };
      }

      scrollToActiveItem();
    }
  }, [location, activeFeedItem]);

}
