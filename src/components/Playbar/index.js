import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useAppState } from '../../AppStateProvider';
import AudioElement from './AudioElement';
import NowPlayingMediaInfo from './NowPlayingMediaInfo';
import PlayerControls from './PlayerControls';
import VolumeControls from './VolumeControls';
import {
  getEpisodeUrl
} from '../../reducers/player';

export default function Playbar() {
  const { player } = useAppState();
  const [showAudioControls, setShowAudioControls] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const episodeUrl = getEpisodeUrl(player);
  const isOffscreen = ! episodeUrl;

  useEffect(() => {
    document.documentElement.classList.toggle('playbar-active', !isOffscreen);
  }, [isOffscreen]);

  return (
    <div className={classNames("c-playbar", { "is-offscreen": isOffscreen })}>
      <div className="c-playbar__audio">
        <AudioElement controls={showAudioControls} setCurrentTime={setCurrentTime} />
      </div>
      <div className="c-playbar__layout">
        <div className="c-playbar__start">
          <NowPlayingMediaInfo episode={player.episode} podcastMeta={player.podcastMeta} />
        </div>
        <div className="c-playbar__middle">
          <PlayerControls currentTime={currentTime} setShowAudioControls={setShowAudioControls} />
        </div>
        <div className="c-playbar__end">
          <VolumeControls />
        </div>
      </div>
    </div>
  );
}

