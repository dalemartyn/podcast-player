import React from 'react';
import { useAppState } from '../../AppStateProvider';
import { Slider } from '@rmwc/slider'; // https://rmwc.io/sliders

export default function PlaybackBar() {
  const { player } = useAppState();
  const {
    currentTime,
    duration
  } = player;

  return (
    <div className="c-playback-bar">
      <div className="c-playback-bar__progress-time ts-time">{formatTime(currentTime)}</div>
      <div className="c-playback-bar__progress-bar">
        <Slider
          onInput={evt => console.log(evt)}
          onChange={evt => console.log(evt)}
          min={0}
          max={player.duration || 1000}
          step={5}
        />
      </div>
      <div className="c-playback-bar__progress-time ts-time">{formatTime(duration)}</div>
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
