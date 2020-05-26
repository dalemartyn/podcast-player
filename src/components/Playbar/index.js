import React from 'react';
import classNames from 'classnames';
import { useAppState } from '../../AppStateProvider';
import AudioElement from './AudioElement';
import NowPlayingMediaInfo from './NowPlayingMediaInfo';
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
      <div className="c-playbar__audio">
        <AudioElement
          state={player.state}
          src={episodeUrl}
        />
      </div>
      <div className="u-padding-left u-padding-right u-padding-vertical-small">
        <div className="c-playbar__layout">
          <div className="c-playbar__start">
            <NowPlayingMediaInfo episode={player.episode} podcastMeta={player.podcastMeta} />
          </div>
          <div className="c-playbar__middle">
            <PlaybackBar />
          </div>
          <div className="c-playbar__end">
          </div>
        </div>
      </div>
    </div>
  );
}

