import React, { useRef, useEffect } from "react";
import { useAppState } from '../../AppStateProvider';
import { Slider } from '@rmwc/slider'; // https://rmwc.io/sliders

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
    <div className="c-player o-wrapper-full u-padding-top-micro u-padding-bottom-micro">
      <Slider
        onInput={evt => console.log(evt)}
        onChange={evt => console.log(evt)}
      />
      <audio controls ref={audioElement} src={player.url} autoPlay className="c-player__audio" />
    </div>
  );
}
