import React from 'react';

export default function PodcastHeader({podcast}) {
  const {
    image,
    title,
    description
  } = podcast;
  return (
    <div className="c-podcast-header u-margin-bottom-xxlarge">
      <div className="c-podcast-header__cover">
        <div className="c-image o-ratio o-ratio--1:1">
          <img src={ image } alt={ title } className="o-ratio__content" />
        </div>
      </div>
      <div className="c-podcast-header__content">
        <h1 className="ts-post-title u-margin-bottom-small">{ title }</h1>
        <p className="u-margin-bottom-none">{ description }</p>
      </div>
    </div>
  );
}
