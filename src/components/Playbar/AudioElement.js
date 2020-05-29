import React from "react";
import { useAppDispatch } from '../../AppStateProvider';
import { useAudioElement } from '../../AudioElementProvider';
import useEventHandler from './hooks/useEventHandler';

export default function AudioElement() {
  const audioElement = useAudioElement();
  const dispatch = useAppDispatch();

  function setCurrentTime() {
    const audio = audioElement.current;
    const value = parseInt(audio.currentTime, 10);
    dispatch({
      type: 'PLAYER_UPDATE_CURRENT_TIME',
      data: {
        value
      }
    });
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
    setTimeout(setCurrentTime, 0);
  }

  useEventHandler('loadedmetadata', setCurrentTime, audioElement);
  useEventHandler('loadedmetadata', setDuration, audioElement);
  useEventHandler('pause', paused, audioElement);
  useEventHandler('play', play, audioElement);
  useEventHandler('playing', play, audioElement);
  useEventHandler('seek', setCurrentTime, audioElement);
  useEventHandler('seeking', setCurrentTime, audioElement);
  useEventHandler('timeupdate', timeUpdate, audioElement);

  return (
    <>
      <audio
        ref={audioElement}
      />
    </>
  )
}
