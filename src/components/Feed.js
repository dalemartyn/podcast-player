import React from 'react';
import usePodcastFeed from '../hooks/usePodcastFeed';

export default function Feed({ feed, route, player, dispatch }) {

  usePodcastFeed( route.feed );

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
    if ( feed.state === 'loading' ) {
      return <p>Loading...</p>;
    } else if (feed.state === 'ready') {
      const items = feed.data.items;
      return items.map((item) => <Item
        item={item}
        key={item.guid}
        player={player}
        onPlayButtonClick={() => playPodcast(item.enclosure.url) }
        onPauseButtonClick={() => pausePodcast(item.enclosure.url) } />
      );
    } else if (feed.state === 'failed' && feed.error) {
      return <><p>Couldn’t load feed.</p><pre>{feed.error}</pre></>;
    }
  }

  function feedTitle() {
    if (feed.data) {
      return feed.data.title;
    }
    return 'Feed';
  }

  return (
    <>
      <h1 className="ts-post-title u-margin-bottom-xxlarge">{ feedTitle() }</h1>
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
