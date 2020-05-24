import React from 'react';

export default function PodcastImage({podcast, className=""}) {
  const {
    image,
    originalImage,
    title
  } = podcast;

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
