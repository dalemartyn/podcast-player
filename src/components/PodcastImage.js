import React from 'react';
import classNames from 'classnames';

export default function PodcastImage({podcastMeta, isSmall=false}) {
  const {
    image,
    originalImage,
    title
  } = podcastMeta;

  let src;

  if (image) {
    src = image;
  } else if (originalImage) {
    src = originalImage;
  } else {
    src = '/img/placeholder.svg';
  }

  const className = classNames(
    'c-podcast-image',
    {
      'c-podcast-image--small': isSmall
    },
    'o-ratio',
    'o-ratio--1:1'
  );

  return (
    <div className={className}>
      <img src={ src } alt={ title } className="o-ratio__content" />
    </div>
  );
}
