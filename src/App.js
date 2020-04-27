import React, { useState, useEffect } from 'react';
import useKeydown from './useKeydown.js';

function App() {
  const [feed, setFeed] = useState([]);
  const [podcastUrl, setPodcastUrl] = useState('');

  function handlePlayButtonClick(item) {
    const isPlaying = (item.link === podcastUrl);
    if (isPlaying) {
      setPodcastUrl('');
    } else {
      setPodcastUrl(item.link);
    }
  }

  useKeydown('d', () => {
    document.documentElement.classList.toggle('t-dark');
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/.netlify/functions/get-podcast');
        const data = await res.json();
        console.log(data);
        setFeed(data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="o-wrapper-l u-padding-vertical-xxlarge u-margin-bottom-xlarge">
      <h1 className="ts-page-title u-margin-bottom-xxlarge">{ feed.title || 'Podcasts' }</h1>
      { feed.items && feed.items.length ?
        <Feed items={feed.items} podcastUrl={podcastUrl} onPlayButtonClick={handlePlayButtonClick} />
        :
        'loading...'
      }
      <div className="c-player u-padding">
        <audio src={podcastUrl} controls autoPlay className="c-player__audio" />
      </div>
    </div>
  );
}

function Feed({items, podcastUrl, onPlayButtonClick}) {
  return items.map((item) => <Item item={item} key={item.guid} podcastUrl={podcastUrl} onPlayButtonClick={onPlayButtonClick} />);
}

function Item({item, podcastUrl, onPlayButtonClick}) {

  const isPlaying = item.link === podcastUrl;

  return (
    <div className="c-podcast-item u-padding-top u-padding-bottom-large">
      <div className="c-podcast-item__button u-margin-right">
        <button className="ts-body-2" onClick={() => onPlayButtonClick(item) }>
          {isPlaying ? 'Stop' : 'Play'}
        </button>
      </div>
      <div className="c-podcast-item__content">
        <h3 className="u-margin-top-none u-margin-bottom-micro">
          {item.title}
        </h3>
        <div className="c-podcast-item__description" dangerouslySetInnerHTML={{__html: item.content}} /> 
      </div>
    </div>
  );
}

export default App;
