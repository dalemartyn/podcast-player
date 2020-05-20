import React, { useRef, useEffect } from "react";
import { useAppState } from '../AppStateProvider';

export default function Playbar() {
  const state = useAppState();

  const player = state.player;
  const audioElement = useRef(null);
  window.audioElement = audioElement;
  
  useEffect(function() {
    if (player.state === 'play') {
      audioElement.current.play();
    } else if (player.state === 'pause') {
      audioElement.current.pause();
    } else if (player.state === 'stop') {
      audioElement.current.stop();
    }
  }, [player.state])

  return (
    <div className="c-player u-padding">
      <audio ref={audioElement} src={player.url} controls autoPlay className="c-player__audio" />
    </div>
  );
}
