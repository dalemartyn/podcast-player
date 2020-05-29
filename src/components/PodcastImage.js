import React from 'react';
import classNames from 'classnames';

export default function PodcastImage({podcastMeta, isSmall=false}) {
  const { title } = podcastMeta;

  const src = getImageSrc(podcastMeta);

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

export function getImageSrc({image, originalImage}) {
  if (image) {
    return image;
  } else if (originalImage) {
    return originalImage;
  } else {
    return '/img/placeholder.svg';
  }
}
