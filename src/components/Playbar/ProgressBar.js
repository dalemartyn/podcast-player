import React, { useEffect, useState, useRef } from 'react';
import {
  useAppState,
  useAppDispatch
} from '../../AppStateProvider';
import { Slider } from '@rmwc/slider'; // https://rmwc.io/sliders
import { throttle } from 'lodash-es';

export default function PlaybackBar() {
  const { player } = useAppState();
  const dispatch = useAppDispatch();

  const [time, setTime] = useState(0);

  function seekToSliderValue(e) {
    const sliderValue = e.detail.value;
    dispatch({
      type: 'PLAYER_SEEK_TO',
      data: {
        time: sliderValue
      }
    });

    // delay switching back to a controlled component
    // so that any animations can run
    setTimeout(function() {
      dispatch({
        type: 'PLAYER_IS_NOT_SEEKING'
      });
    }, 500);
  }

  function setSeeking(e) {
    dispatch({
      type: 'PLAYER_IS_SEEKING',
      data: {
        value: e.detail.value
      }
    });
  }

  const throttledSetSeeking = useRef(throttle(setSeeking, 32));
  const throttledSeekTo = useRef(throttle(seekToSliderValue, 100));

  useEffect(() => {
    if (!player.isSeeking) {
      setTime(player.currentTime);
    }
  }, [player.currentTime, player.isSeeking]);

  const disabled = !player.duration;

  return (
    <Slider
      onInput={throttledSetSeeking.current}
      onChange={throttledSeekTo.current}
      min={0}
      max={player.duration || 3600}
      step={1}
      value={time}
      disabled={disabled}
    />
  );
}
