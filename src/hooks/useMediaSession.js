import { useEffect } from 'react';
import { useAppState } from '../AppStateProvider';
import { useAudioElement } from '../AudioElementProvider';
import useSkipControls from './useSkipControls';
import { getImageSrc } from '../components/PodcastImage';

export default function useMediaSession() {
  const audioElement = useAudioElement();
  const { skipPrevious, skipNext } = useSkipControls();
  const { player } = useAppState();
  const {
    episode,
    podcastMeta
  } = player;

  useEffect(function() {

    if ( 'mediaSession' in navigator) {
      navigator.mediaSession.metadata = new window.MediaMetadata({
        title: episode.title,
        artist: podcastMeta.title,
        artwork: [
          { src: getImageSrc(podcastMeta), sizes: '480x480', type: 'image/png' }
        ]
      });

      navigator.mediaSession.setActionHandler('seekbackward', () => {
        const audio = audioElement.current;
        audio.currentTime = audio.currentTime - 10;
      });

      navigator.mediaSession.setActionHandler('seekforward', () => {
        const audio = audioElement.current;
        audio.currentTime = audio.currentTime + 30;
      });

      navigator.mediaSession.setActionHandler('previoustrack', skipPrevious);
      navigator.mediaSession.setActionHandler('nexttrack', skipNext);
    }
  }, [episode, podcastMeta, audioElement, skipNext, skipPrevious]);

}
