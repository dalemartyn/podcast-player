import React from 'react';
import {
  Link,
  useLocation
} from 'react-router-dom';
import PodcastImage from '../PodcastImage';

export default function NowPlayingMediaInfo({episode, podcastMeta}) {
  const location = useLocation();

  function handleClick(e) {
    const params = new URLSearchParams(location.search);
    const currentPodcastView = params.get('rss');

    if (podcastMeta.url === currentPodcastView) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }

  if (!podcastMeta.url) {
    return (
      <div className="c-now-playing-media-info">
        <div className="c-now-playing-media-info__artwork">
          <PodcastImage podcastMeta={podcastMeta} isSmall={true} />
        </div>
      </div>
    );
  }

  return (
    <Link
      to={{
        pathname: '/podcast',
        search: '?rss=' + encodeURIComponent(podcastMeta.url)
      }}
      onClick={handleClick}
      className="c-now-playing-media-info"
    >
      <div className="c-now-playing-media-info__artwork">
        <PodcastImage podcastMeta={podcastMeta} isSmall={true} />
      </div>
      <div className="c-now-playing-media-info__content">
        <div className="c-now-playing-media-info__episode-title ts-display-6">{ episode.title }</div>
        <div className="c-now-playing-media-info__podcast-title ts-meta">{ podcastMeta.title }</div>
      </div>
    </Link>
  );
}
