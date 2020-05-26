import React from 'react';
import PodcastImage from '../PodcastImage';

export default function PodcastHeader({podcastMeta}) {
  const {
    title,
    description
  } = podcastMeta;
  return (
    <div className="c-podcast-header u-margin-bottom-xlarge">
      <div className="c-podcast-header__artwork">
        <PodcastImage podcastMeta={podcastMeta} />
      </div>
      <div className="c-podcast-header__content">
        <h1 className="ts-post-title u-margin-bottom-small">{ title }</h1>
        <p className="u-margin-bottom-none">{ description }</p>
      </div>
    </div>
  );
}
