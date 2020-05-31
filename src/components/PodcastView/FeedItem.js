import React from 'react';
import {
  Pause,
  Play
} from './icons';
import { isInPlayer, isPlaying } from '../../reducers/player';
import classNames from 'classnames';

export default function FeedItem({episode, player, onPlayButtonClick, onPauseButtonClick, activeFeedItemRef}) {
  let button;
  const active = isInPlayer(player, episode);

  if (isPlaying(player, episode)) {
    button = <button onClick={onPauseButtonClick} className="c-player-button c-player-button--large c-player-button--flush">
      <Pause aria-label="Pause" />
    </button>
  } else {
    button = <button onClick={() => onPlayButtonClick(episode) } className="c-player-button c-player-button--large c-player-button--flush">
      <Play aria-label="Play" />
    </button>;
  }

  return (
    <div className={classNames("c-feed-item", { "c-feed-item--active": active }, "u-padding-top", "u-padding-bottom-large")} ref={activeFeedItemRef}>
      <div className="c-feed-item__background"></div>
      <div className="c-feed-item__button u-margin-right">
        {button}
      </div>
      <div className="c-feed-item__content">
        <h3 className="u-margin-top-none u-margin-bottom-xmicro">
          {episode.title}
        </h3>
        <div className="c-feed-item__meta ts-label u-margin-bottom-xmicro">
          <span className="c-feed-item__date">{episode.date}</span>
          <span className="c-feed-item__bullet-separator">·</span>
          <span className="c-feed-item__duration">{episode.duration}</span>
        </div>
        <div className="c-feed-item__description">
          <p>{episode.subtitle}</p>
        </div>
      </div>
    </div>
  );
}
