import React from "react";
import { useAppDispatch } from '../../AppStateProvider';
import { useAudioElement } from '../../AudioElementProvider';
import useEventHandler from './hooks/useEventHandler';

export default function AudioElement({controls, setCurrentTime}) {
  const audioElement = useAudioElement();
  const dispatch = useAppDispatch();

  function updateCurrentTime() {
    const audio = audioElement.current;
    const value = parseInt(audio.currentTime, 10);
    setCurrentTime(value);
  }

  function setDuration() {
    const audio = audioElement.current;
    const value = parseInt(audio.duration, 10);

    dispatch({
      type: 'PLAYER_UPDATE_DURATION',
      data: {
        value
      }
    });
  }

  function paused() {
    dispatch({
      type: 'PLAYER_PAUSE'
    });
  }

  function play() {
    dispatch({
      type: 'PLAYER_PLAY'
    });
  }

  function timeUpdate() {
    setTimeout(updateCurrentTime, 0);
  }

  useEventHandler('loadedmetadata', updateCurrentTime, audioElement);
  useEventHandler('loadedmetadata', setDuration, audioElement);
  useEventHandler('pause', paused, audioElement);
  useEventHandler('play', play, audioElement);
  useEventHandler('playing', play, audioElement);
  useEventHandler('seek', updateCurrentTime, audioElement);
  useEventHandler('seeking', updateCurrentTime, audioElement);
  useEventHandler('timeupdate', timeUpdate, audioElement);

  return (
    <>
      <audio
        ref={audioElement}
        controls={controls}
      />
    </>
  )
}
