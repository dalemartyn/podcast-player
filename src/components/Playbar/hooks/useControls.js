import { useEffect } from 'react';

export default function useControls(state, audioElement) {

  useEffect(function () {
    const audio = audioElement.current;

    if (state === 'play') {
      audio.play();
    } else if (state === 'pause') {
      audio.pause();
    } else if (state === 'stop') {
      audio.stop();
    }
  }, [state, audioElement]);
}
