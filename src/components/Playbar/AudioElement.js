import React, { useRef, useEffect } from "react";

export default function AudioElement(props) {
  const {
    src,
    state,
    min = 0,
    max = 100
  } = props;

  const audioElement = useRef(null);
  usePlayerState(audioElement, state);
  useEventListeners(audioElement, props);

  return (
    <audio
      controls
      ref={audioElement}
      src={src}
      min={min}
      max={max}
      className="c-player__audio"
    />
  )
}

function usePlayerState(audioElement, state) {
  useEffect(function () {
    const audio = audioElement.current;

    if (state === 'play') {
      audio.play();
    } else if (state === 'pause') {
      audio.pause();
    } else if (state === 'stop') {
      audio.stop();
    }
  }, [audioElement, state]);
}


function useEventListeners(audioElement, props) {
  const {
    onMetadata = () => {},
    onPlay = () => {}
  } = props;

  useEffect(function addEventListeners() {
    const audio = audioElement.current;

    const metadataHandler = (e) => {
      console.log('meta');
      onMetadata({
        duration: e.target.duration,
        currentTime: e.target.currentTime
      });
    };

    const playHandler = (e) => {
      audio.play();
      console.log('canplay');
      onPlay({
        duration: e.target.duration,
        currentTime: e.target.currentTime
      })
    };

    audio.addEventListener('loadedmetadata', metadataHandler);
    audio.addEventListener('canplay', playHandler);

    return function destroyEventListeners() {
      audio.removeEventListener('loadedmetadata', metadataHandler);
      audio.removeEventListener('canplay', playHandler);
    }
  }, [audioElement, onPlay, onMetadata]);
}
