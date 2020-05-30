import React, { useState } from "react";
import { useAudioElement } from '../../AudioElementProvider';
import { Slider } from '@rmwc/slider'; // https://rmwc.io/sliders

export default function VolumeControls() {
  const audioElement = useAudioElement();
  const [volume, setVolume] = useState(1);

  function changeVolume(e) {
    const audio = audioElement.current;
    setVolume(e.detail.value);
    audio.volume = volume;
  }

  return (
    <div className="c-volume-slider u-padding-left u-padding-right">
      <Slider
        onInput={changeVolume}
        onChange={changeVolume}
        min={0}
        max={1}
        value={volume}
      />
    </div>
  );
}
