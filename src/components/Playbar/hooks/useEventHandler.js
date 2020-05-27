import { useEffect } from 'react';

export default function useEventHandler(eventName, handler, audioElement) {
  useEffect(() => {
    const audio = audioElement.current;

    const eventHandler = (e) => handler({
      currentTime: e.target.currentTime,
      duration: e.target.duration
    });

    audio.addEventListener(eventName, eventHandler);

    return () => {
      audio.removeEventListener(eventName, eventHandler);
    }
  }, [eventName, handler, audioElement]);
}
