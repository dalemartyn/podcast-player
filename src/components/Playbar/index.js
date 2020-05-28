import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useAppState } from '../../AppStateProvider';
import AudioElement from './AudioElement';
import NowPlayingMediaInfo from './NowPlayingMediaInfo';
import PlayerControls from './PlayerControls';
import {
  getEpisodeUrl
} from '../../reducers/player';

export default function Playbar() {
  const { player } = useAppState();

  const episodeUrl = getEpisodeUrl(player);
  const isOffscreen = ! episodeUrl;

  useEffect(() => {
    document.documentElement.classList.toggle('playbar-active', !isOffscreen);
  }, [isOffscreen]);

  return (
    <div className={classNames("c-playbar", { "is-offscreen": isOffscreen })}>
      <div className="c-playbar__audio">
        <AudioElement />
      </div>
      <div className="c-playbar__layout">
        <div className="c-playbar__start">
          <NowPlayingMediaInfo episode={player.episode} podcastMeta={player.podcastMeta} />
        </div>
        <div className="c-playbar__middle">
          <PlayerControls />
        </div>
        <div className="c-playbar__end">
        </div>
      </div>
    </div>
  );
}

