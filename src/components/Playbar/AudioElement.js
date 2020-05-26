import React, { useRef, } from "react";
import { useAppDispatch } from '../../AppStateProvider';
import {
  usePlayerState,
  useEventHandler,
  useListenTracker
} from "./audio-element-hooks";

export default function AudioElement({
  src = null,
  state
}) {
  const audioElement = useRef(null);
  const dispatch = useAppDispatch();

  function updatePlayerCurrentTime({duration, currentTime}) {
    dispatch({
      type: 'UPDATE_CURRENT_TIME',
      data: {
        currentTime,
        duration
      }
    });
  }

  function canPlayPodcast() {
    dispatch({
      type: 'CAN_PLAY_PODCAST'
    });
  }

  usePlayerState(state, audioElement);
  useEventHandler('canplay', canPlayPodcast, audioElement);
  useEventHandler('loadedmetadata', updatePlayerCurrentTime, audioElement);
  useEventHandler('seeking', (e) => {
    console.log("seeking", e.currentTime);
    updatePlayerCurrentTime(e);
  }, audioElement);
  useEventHandler('seeked', (e) => {
    console.log("seeked", e.currentTime);
    updatePlayerCurrentTime(e);
  }, audioElement);
  useListenTracker(updatePlayerCurrentTime, audioElement);

  return (
    <audio
      controls
      ref={audioElement}
      src={src}
    />
  )
}
