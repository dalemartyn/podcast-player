import React, { useState } from 'react';
import { useAppState } from '../../AppStateProvider';
import ProgressBar from './ProgressBar';

export default function PlaybackBar() {
  const { player } = useAppState();
  const [useSliderValue, setUseSliderValue] = useState(false);
  const [slider, setSlider] = useState({
    active: false,
    value: null
  });

  const time = useSliderValue ? slider.value : player.currentTime;

  return (
    <div className="c-playback-bar">
      <div className="c-playback-bar__progress-time ts-time">{formatTime(time)}</div>
      <div className="c-playback-bar__progress-bar">
        <ProgressBar
          slider={slider}
          setSlider={setSlider}
          setUseSliderValue={setUseSliderValue}
        />
      </div>
      <div className="c-playback-bar__progress-time ts-time">{formatTime(player.duration)}</div>
    </div>
  );
}

function formatTime(s) {
  if (!s) return '00:00';

  const mins = Math.floor(s / 60);
  const secs = Math.floor(s % 60);

  const pad = (n) => n.toString().padStart(2, '0');

  return pad(mins) + ':' + pad(secs);
}
