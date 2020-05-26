import React from 'react';
import {
  useLocation,
  useNavigate
} from 'react-router-dom';

export default function EpisodeButton({episode, podcastUrl}) {
  const navigate = useNavigate();
  const location = useLocation();

  function handleClick() {
    const params = new URLSearchParams(location.search);
    const currentPodcastView = params.get('rss');

    if (podcastUrl === currentPodcastView) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      console.log('scroll');
    } else {
     const podcastViewPathname = '/podcast?rss=' + encodeURIComponent(podcastUrl);
      navigate(podcastViewPathname);
    }
  }

  if (!episode) {
    return null;
  }

  return <button onClick={handleClick}>{episode.title}</button>
}
