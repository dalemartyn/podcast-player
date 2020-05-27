import { useEffect } from 'react';

export default function useSeek(startAt, audioElement) {

  useEffect(function () {
    const audio = audioElement.current;
    audio.currentTime = startAt;
  }, [startAt, audioElement]);

}
