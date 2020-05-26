import React from 'react';
import {
  PauseOutline32,
  PlayOutline32
} from '@carbon/icons-react';

export default function FeedItem({episode, player, onPlayButtonClick, onPauseButtonClick}) {
  let button;

  if (isPlaying(episode, player)) {
    button = <button className="ts-body-2" onClick={onPauseButtonClick}>
      <PauseOutline32 aria-label="Pause" className="c-icon c-icon--pause" />
    </button>
  } else {
    button = <button onClick={() => onPlayButtonClick(episode) }>
      <PlayOutline32 aria-label="Play" className="c-icon c-icon--play" />
    </button>;
  }

  return (
    <div className="c-feed-item u-padding-top u-padding-bottom-large">
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

export function isInPlayer(episode, player) {
  let episodeUrl;

  if (typeof episode.media !== "undefined") {
    episodeUrl = episode.media.url;
  } else {
    console.log("Redacted podcast episode.", episode);
    return false;
  }

  if (
    player.episode && player.episode.media &&
    (player.episode.media.url === episodeUrl)
  ) {
    return true;
  }

  return false;
}

export function isPlaying(episode, player) {
  return isInPlayer(episode, player) &&
    (player.state === "play" || player.state === "load");
}
