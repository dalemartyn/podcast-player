import React from 'react';

export default function FeedItem({episode, player, onPlayButtonClick, onPauseButtonClick}) {
  let url;
  let button;

  if (typeof episode.media !== "undefined") {
    url = episode.media.url;
  } else {
    // redacted podcast episode.
    console.log(episode);
  }

  const isPlaying = (url === player.url && player.state === "play");

  if (isPlaying) {
    button = <button className="ts-body-2" onClick={onPauseButtonClick}>
      Pause
    </button>
  } else {
    button = <button className="ts-body-2" onClick={() => onPlayButtonClick(episode) }>
      Play
    </button>;
  }

  return (
    <div className="c-feed-item u-padding-top u-padding-bottom-large">
      <div className="c-feed-item__button u-margin-right">
        {button}
      </div>
      <div className="c-feed-item__content">
        <h3 className="u-margin-top-none u-margin-bottom-micro">
          {episode.title}
        </h3>
        <div className="c-feed-item__description">
          <p>{episode.summary}</p>
        </div>
      </div>
    </div>
  );
}
