import React from "react";
import { useAppState } from '../../AppStateProvider';
import { Slider } from '@rmwc/slider'; // https://rmwc.io/sliders
import { useLocation, useNavigate } from 'react-router-dom';
import AudioElement from './AudioElement';

export default function Playbar() {
  const state = useAppState();

  const player = state.player;

  const episodeUrl = getEpisodeUrl(player)

  return (
    <div className="c-player o-wrapper-full u-padding-top-micro u-padding-bottom-micro">
      <EpisodeButton episode={player.episode} podcastUrl={player.podcastUrl} />
      <Slider
        onInput={evt => console.log(evt)}
        onChange={evt => console.log(evt)}
        min={0}
        max={1000}
        step={5}
      />
      <AudioElement
        state={player.state}
        src={episodeUrl}
      />
    </div>
  );
}

function getEpisodeUrl(player) {
  if (
    player.episode &&
    player.episode.media &&
    player.episode.media.url
  ) {
    return player.episode.media.url;
  }

  return "";
}



function EpisodeButton({episode, podcastUrl}) {
  const navigate = useNavigate();
  const location = useLocation();

  function handleClick() {
    const params = new URLSearchParams(location.search);
    const currentPodcastView = params.get('rss');

    if (podcastUrl === currentPodcastView) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      console.log('scroll');
    } else {
     const podcastViewPathname = '/podcast?rss=' + encodeURIComponent(podcastUrl);
      navigate(podcastViewPathname);
    }
  }

  if (!episode) {
    return null;
  }

  return <button onClick={handleClick}>{episode.title}</button>
}
