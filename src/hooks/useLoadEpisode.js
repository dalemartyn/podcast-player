import { useAppDispatch } from '../AppStateProvider';
import { useAudioElement } from '../AudioElementProvider';

export default function useLoadEpisode() {
  const dispatch = useAppDispatch();
  const audioElement = useAudioElement();

  return function loadEpisode(episode, podcastMeta) {
    const audio = audioElement.current;

    const src = episode.media.url;
    audio.src = src;

    dispatch({
      type: 'PLAYER_LOAD_EPISODE',
      data: {
        episode,
        podcastMeta
      }
    });

    audio.load();
    audio.play()
      .catch(e => console.log('playing failed or was interrupted'));
  }
}
