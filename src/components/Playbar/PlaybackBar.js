import React, { useState } from 'react';
import { useAppState, useAppDispatch } from '../../AppStateProvider';
import { Slider } from '@rmwc/slider'; // https://rmwc.io/sliders

export default function PlaybackBar() {
  const { player } = useAppState();
  const dispatch = useAppDispatch();
  const [slider, setSlider] = useState({
    active: false,
    value: null
  });

  function handleInput(e) {
    setSlider({
      active: true,
      value: e.detail.value
    });
  }

  function handleChange(e) {
    const sliderValue = e.detail.value;

    dispatch({
      type: 'PLAYER_SEEK_TO',
      data: {
        value: sliderValue
      }
    });

    setSlider({
      active: false,
      value: e.detail.value
    });
  }

  const disabled = !player.duration;
  const time = slider.active ? slider.value : player.currentTime;

  return (
    <div className="c-playback-bar">
      <div className="c-playback-bar__progress-time ts-time"><Time seconds={time} /></div>
      <div className="c-playback-bar__progress-bar">
        <Slider
          onInput={handleInput}
          onChange={handleChange}
          min={0}
          max={player.duration || 3600}
          step={1}
          value={time}
          disabled={disabled}
        />
      </div>
      <div className="c-playback-bar__progress-time ts-time"><Time seconds={player.duration} /></div>
    </div>
  );
}

function Time({seconds}) {
  if (!seconds) return '00:00';

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  const pad = (n) => n.toString().padStart(2, '0');

  return pad(mins) + ':' + pad(secs);
}

