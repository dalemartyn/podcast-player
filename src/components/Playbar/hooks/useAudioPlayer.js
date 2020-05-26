import { useEffect } from 'react';

export default function useAudioPlayer(player, audioElement) {
  const {
    state,
    startAt
  } = player;
  useEffect(function () {
    const audio = audioElement.current;

    if (state === 'play') {
      audio.play();
    } else if (state === 'pause') {
      audio.pause();
    } else if (state === 'stop') {
      audio.stop();
    }

    if (startAt) {
      audio.currentTime = startAt;
    }
  }, [state, startAt, audioElement]);
}
