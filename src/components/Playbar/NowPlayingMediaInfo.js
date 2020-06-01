import React from 'react';
import {
  Link,
  useLocation,
  useNavigate
} from 'react-router-dom';
import PodcastImage from '../PodcastImage';

export default function NowPlayingMediaInfo({episode, podcastMeta}) {
  const location = useLocation();
  const navigate = useNavigate();

  const to = {
    pathname: '/podcast',
    search: '?rss=' + encodeURIComponent(podcastMeta.url)
  };

  function handleClick(e) {
    e.preventDefault();
    const params = new URLSearchParams(location.search);
    const currentPodcastView = params.get('rss');

    if (podcastMeta.url === currentPodcastView) {
      navigate(to, {
        replace: true,
        state: {
          scrollToNowPlaying: true,
          blockScrollToTop: true
        }
      })
    } else {
      navigate(to, {
        state: { scrollToNowPlaying: true }
      })
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
      to={to}
      onClick={handleClick}
      className="c-now-playing-media-info"
    >
      <div className="c-now-playing-media-info__artwork">
        <PodcastImage podcastMeta={podcastMeta} isSmall={true} />
      </div>
      <div className="c-now-playing-media-info__content">
        <div className="c-now-playing-media-info__episode-title ts-display-6">{ episode.title }</div>
        <div className="c-now-playing-media-info__podcast-title ts-label">{ podcastMeta.title }</div>
      </div>
    </Link>
  );
}
