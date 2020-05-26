import React, { useRef } from "react";
import { useAppState, useAppDispatch } from '../../AppStateProvider';
import { getEpisodeUrl } from '../../reducers/player';
import useAudioPlayer from './hooks/useAudioPlayer';
import useEventHandler from './hooks/useEventHandler';
import useListenTracker from './hooks/useListenTracker';

export default function AudioElement() {
  const { player } = useAppState();
  const src = getEpisodeUrl(player);

  const audioElement = useRef(null);
  const dispatch = useAppDispatch();

  function updatePlayerCurrentTime() {
    dispatch({
      type: 'PLAYER_UPDATE_CURRENT_TIME',
      data: {
        value: audioElement.current.currentTime,
      }
    });
  }

  function updatePlayerDuration() {
    dispatch({
      type: 'PLAYER_UPDATE_DURATION',
      data: {
        value: audioElement.current.duration,
      }
    });
  }

  function canPlayPodcast() {
    dispatch({
      type: 'PLAYER_CAN_PLAY'
    });
  }

  useAudioPlayer(player, audioElement);
  useEventHandler('canplay', canPlayPodcast, audioElement);
  useEventHandler('loadedmetadata', updatePlayerCurrentTime, audioElement);
  useEventHandler('loadedmetadata', updatePlayerDuration, audioElement);
  useListenTracker(updatePlayerCurrentTime, audioElement);

  return (
    <>
      <audio
        controls
        ref={audioElement}
        src={src}
      />
    </>
  )
}
