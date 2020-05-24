import React from 'react';
import PodcastImage from '../PodcastImage';

export default function PodcastHeader({podcast}) {
  const {
    title,
    description
  } = podcast;
  return (
    <div className="c-podcast-header u-margin-bottom-xlarge">
      <div className="c-podcast-header__cover">
        <div className="c-image o-ratio o-ratio--1:1">
          <PodcastImage podcast={podcast} className="o-ratio__content" />
        </div>
      </div>
      <div className="c-podcast-header__content">
        <h1 className="ts-post-title u-margin-bottom-small">{ title }</h1>
        <p className="u-margin-bottom-none">{ description }</p>
      </div>
    </div>
  );
}
