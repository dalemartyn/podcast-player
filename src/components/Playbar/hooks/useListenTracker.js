import { useState, useEffect } from "react";
import useInterval from './useInterval';

export default function useListenTracker(callback, audioElement) {
  const [delay, setDelay] = useState(null);

  useEffect(() => {
    const audio = audioElement.current;

    function startTicking() {
      setDelay(500);
    }

    function stopTicking() {
      setDelay(null);
    }

    audio.addEventListener('play', startTicking);
    audio.addEventListener('pause', stopTicking);

    return () => {
      audio.removeEventListener('play', startTicking);
      audio.removeEventListener('pause', stopTicking);
    }
  }, [audioElement]);

  useInterval(callback, delay);
}
