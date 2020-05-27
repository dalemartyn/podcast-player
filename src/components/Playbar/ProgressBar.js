import React from 'react';
import {
  useAppState,
  useAppDispatch
} from '../../AppStateProvider';
import { Slider } from '@rmwc/slider'; // https://rmwc.io/sliders

export default function PlaybackBar({slider, setSlider, setUseSliderValue}) {
  const { player } = useAppState();
  const dispatch = useAppDispatch();

  function handleInput(e) {
    setUseSliderValue(true);
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

    setUseSliderValue(false);

    setSlider((state) => ({
      active: state.active,
      value: e.detail.value
    }));

    // delay changing slider active
    // (and using player.currentTime)
    // so that any animations can run
    setTimeout(function() {
      setSlider((state) => ({
        active: false,
        value: state.value
      }));
    }, 500);
  }

  const time = slider.active ? slider.value : player.currentTime;
  const disabled = !player.duration;

  return (
    <Slider
      onInput={handleInput}
      onChange={handleChange}
      min={0}
      max={player.duration || 3600}
      step={1}
      value={time}
      disabled={disabled}
    />
  );
}
