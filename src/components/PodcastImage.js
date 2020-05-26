import React from 'react';

export default function PodcastImage({podcastMeta, className=""}) {
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

  return (
    <img src={ src } alt={ title } className={className} />
  );
}
