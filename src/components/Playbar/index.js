import React from 'react';
import classNames from 'classnames';
import { useAppState } from '../../AppStateProvider';
import AudioElement from './AudioElement';
import EpisodeButton from './EpisodeButton';
import PlaybackBar from './PlaybackBar';
import {
  getEpisodeUrl
} from '../../reducers/player';

export default function Playbar() {
  const { player } = useAppState();
  const episodeUrl = getEpisodeUrl(player);

  const isOffscreen = ! episodeUrl;

  return (
    <div className={classNames("c-playbar", { "is-offscreen": isOffscreen })}>
      <div className="u-padding-left u-padding-right u-padding-vertical-micro">
        <div className="c-playbar__layout">
          <div className="c-playbar__start">
            <EpisodeButton episode={player.episode} podcastUrl={player.podcastUrl} />
          </div>
          <div className="c-playbar__middle">
            <PlaybackBar />
          </div>
          <div className="c-playbar__end">
            <AudioElement
              state={player.state}
              src={episodeUrl}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

