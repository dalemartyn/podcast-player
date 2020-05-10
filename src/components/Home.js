import React from 'react';
import podcasts from '../podcasts.json';

export default function Home({ dispatch }) {

  function showPodcastFeed(url) {
    dispatch({
      type: 'SET_ROUTE',
      data: {
        path: 'feed',
        feed: url
      }
    });
  }

  const podcastGridItems = podcasts.map(function(podcast) {
    return <PodcastGridItem podcast={podcast} onPodcastClick={showPodcastFeed} key={podcast.url} />
  });

  return (
    <>
      <h1 className="ts-page-title u-margin-bottom-xxlarge">Podcasts</h1>
      <ul className="c-podcast-grid">
        { podcastGridItems }
      </ul>
    </>
  );
}

function PodcastGridItem({ podcast, onPodcastClick }) {
  function handleClick(e) {
    e.preventDefault();
    onPodcastClick(podcast.url);
  }

  return (
    <li className="c-podcast-grid__item">
      <div className="o-ratio o-ratio--1:1">
        <a href="/feed" onClick={(e) => handleClick(e)} className="c-podcast-grid__link o-ratio__content">
          <img src={podcast.image} alt={podcast.title} />
        </a>
      </div>
      <h2 className="ts-display-5 u-margin-top-small">
        {podcast.title || podcast.url}
      </h2>
    </li>
  );
}
