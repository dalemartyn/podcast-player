import React from 'react';
import usePodcastFeed from '../hooks/usePodcastFeed';
import { useLocation } from 'react-router-dom';
import {
  useAppState,
  useAppDispatch
} from '../AppStateProvider';
import { getFeed } from '../reducers/podcasts';
import Spinner from './Spinner';

export default function Feed() {
  const location = useLocation();
  const { podcasts, player } = useAppState();
  const dispatch = useAppDispatch();
  const params = new URLSearchParams(location.search);
  const podcastUrl = params.get('rss');

  usePodcastFeed( podcastUrl );

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
    const feed = getFeed(podcasts);

    if ( !feed.data ) {
      return <Spinner />;
    } else if (feed.state === 'failed' && feed.error) {
      return <><p>Couldn’t load feed.</p><pre>{feed.error}</pre></>;
    } else if (feed.data.items && feed.data.items.length) {
      const episodes = feed.data.items;
      return episodes.map((episode) => <FeedItem
        episode={episode}
        key={episode.guid}
        player={player}
        onPlayButtonClick={() => playPodcast(episode.enclosure.url) }
        onPauseButtonClick={() => pausePodcast(episode.enclosure.url) } />
      );
    }
  }

  function feedTitle() {
    const feed = getFeed(podcasts);
    if (feed.data) {
      return <h1 className="ts-post-title u-margin-bottom-xxlarge">{ feed.data.title }</h1>;
    }
  }

  return (
    <>
      { feedTitle() }
      { feedContent() }
    </>
  );
}

function FeedItem({episode, player, onPlayButtonClick, onPauseButtonClick}) {
  let url;
  let button;

  if (typeof episode.enclosure !== "undefined") {
    url = episode.enclosure.url;
  } else {
    // redacted podcast episode.
    console.log(episode);
  }

  const isPlaying = url === player.url && player.state === "play";

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
          <p>{episode.contentSnippet}</p>
        </div>
      </div>
    </div>
  );
}
