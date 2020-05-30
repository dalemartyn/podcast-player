import React, { useState } from 'react';
import { useAppState } from '../../AppStateProvider';
import { useAudioElement } from '../../AudioElementProvider';
import { Slider } from '@rmwc/slider'; // https://rmwc.io/sliders
import classNames from 'classnames';
import { isDisabled } from '../../reducers/player';

export default function PlaybackBar({currentTime}) {
  const { player } = useAppState();
  const audioElement = useAudioElement();

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

    audioElement.current.currentTime = sliderValue;

    setTimeout(() => {
      setSlider({
        active: false,
        value: e.detail.value
      });
    }, 100);
  }

  const disabled = isDisabled(player);
  const time = slider.active ? slider.value : currentTime;

  const timeClassName = classNames(
    "c-playback-bar__progress-time",
    { "c-playback-bar__progress-time--disabled": disabled }
  );

  return (
    <div className="c-playback-bar">
      <div className={timeClassName}>
        <Time seconds={time} />
      </div>
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
      <div className={timeClassName}>
        <Time seconds={player.duration} />
      </div>
    </div>
  );
};

function Time({seconds}) {
  if (!seconds) return '00:00';

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  const pad = (n) => n.toString().padStart(2, '0');

  return pad(mins) + ':' + pad(secs);
}

