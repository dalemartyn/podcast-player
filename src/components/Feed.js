import React from 'react';
import usePodcastFeed from '../hooks/usePodcastFeed';

export default function Feed({ feed, route, player, dispatch }) {

  usePodcastFeed( route.feed );

  const items = feed.items;

  function playPodcast(podcastUrl) {
    dispatch({
      type: 'PLAY_PODCAST',
      data: {
        url: podcastUrl
      }
    });
  }

  function pausePodcast() {
    dispatch({
      type: 'PAUSE_PODCAST'
    });
  }

  function feedContent() {
    if ( items && items.length ) {
      return items.map((item) => <Item
        item={item}
        key={item.guid}
        player={player}
        onPlayButtonClick={() => playPodcast(item.enclosure.url) }
        onPauseButtonClick={() => pausePodcast(item.enclosure.url) } />
      );
    } else {
      return <p>Loading...</p>;
    }
  }

  return (
    <>
      <h1 className="ts-post-title u-margin-bottom-xxlarge">{ feed.title }</h1>
      { feedContent() }
    </>
  );
}

function Item({item, player, onPlayButtonClick, onPauseButtonClick}) {
  let url;
  let button;

  if (typeof item.enclosure !== "undefined") {
    url = item.enclosure.url;
  } else {
    // redacted podcast.
    console.log(item);
  }

  const isPlaying = url === player.url && player.state === "play";

  if (isPlaying) {
    button = <button className="ts-body-2" onClick={onPauseButtonClick}>
      Pause
    </button>
  } else {
    button = <button className="ts-body-2" onClick={() => onPlayButtonClick(item) }>
      Play
    </button>;
  }

  return (
    <div className="c-podcast-item u-padding-top u-padding-bottom-large">
      <div className="c-podcast-item__button u-margin-right">
        {button}
      </div>
      <div className="c-podcast-item__content">
        <h3 className="u-margin-top-none u-margin-bottom-micro">
          {item.title}
        </h3>
        <div className="c-podcast-item__description">
          <p>{item.contentSnippet}</p>
        </div>
      </div>
    </div>
  );
}
