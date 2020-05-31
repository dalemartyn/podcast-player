import React, { useState } from "react";
import { useAudioElement } from '../../AudioElementProvider';
import { Slider } from '@rmwc/slider'; // https://rmwc.io/sliders
import * as Icon from './buttons/icons';

export default function VolumeControls() {
  const audioElement = useAudioElement();
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  function changeVolume(e) {
    const audio = audioElement.current;
    setVolume(e.detail.value);
    audio.volume = volume;
  }

  function mute() {
    const audio = audioElement.current;
    audio.muted = !isMuted;
    setIsMuted(m => !m);
  }

  return (
    <div className="c-volume-slider u-padding-left u-padding-right">
      <button onClick={mute} className="c-volume-slider__icon c-player-button c-player-button--small">
        <VolumeIcon isMuted={isMuted} volume={volume} />
      </button>
      <Slider
        onInput={changeVolume}
        onChange={changeVolume}
        min={0}
        max={1}
        value={isMuted ? 0 : volume}
      />
    </div>
  );
}

function VolumeIcon({isMuted, volume}) {
  if (isMuted) {
    return <Icon.VolumeOff />
  }

  if (volume === 0) {
    return <Icon.VolumeMute / >
  }

  if (volume < .66) {
    return <Icon.VolumeDown />
  }

  return <Icon.VolumeUp />
}
