import { useRef, useEffect } from "react";

function usePlayerState(state, audioElement) {
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

function useEventHandler(eventName, handler, audioElement) {
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

function useListenTracker(onTrack, audioElement) {
  const LISTEN_INTERVAL = 1000;
  const listenTracker = useRef();

  useEffect(function() {
    const audio = audioElement.current;

    function setListenTracker() {
      if (!listenTracker.current) {
        listenTracker.current = window.setInterval(() => {
          onTrack({
            currentTime: audio.currentTime,
            duration: audio.duration,
          });
        }, LISTEN_INTERVAL);
      }
    }

    function clearListenTracker() {
      if (listenTracker.current) {
        clearInterval(listenTracker.current);
        listenTracker.current = null;
      }
    }

    audio.addEventListener('play', setListenTracker);
    audio.addEventListener('pause', clearListenTracker);

    return function() {
      audio.removeEventListener('play', setListenTracker);
      audio.removeEventListener('pause', clearListenTracker);
    };
  }, [onTrack, audioElement]);

}

export {
  usePlayerState,
  useEventHandler,
  useListenTracker
};
