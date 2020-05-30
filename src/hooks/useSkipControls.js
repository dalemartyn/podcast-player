import { useAppState } from '../AppStateProvider';
import { getPodcastEpisodes } from '../reducers/podcasts';
import { findIndex } from 'lodash-es';
import useLoadEpisode from './useLoadEpisode';

export default function useControls() {
  const { player, podcasts } = useAppState();
  const loadEpisode = useLoadEpisode();

  function getEpisode(offset) {
    const episodes = getPodcastEpisodes(podcasts, player.podcastMeta.url);
    if (!episodes) return null;
    const currentEpisodeIndex = findIndex(episodes, {
      guid: player.episode.guid
    });
    return episodes[currentEpisodeIndex + offset] || null;
  }

  function skip(offset) {
    const episode = getEpisode(offset);
    if (episode) {
      loadEpisode(episode, player.podcastMeta);
    }
  }

  function skipPrevious() {
    skip(+1);
  }

  function skipNext() {
    skip(-1);
  }

  function getPrevious() {
    return getEpisode(+1);
  }

  function getNext() {
    return getEpisode(-1);
  }

  return {
    skipPrevious,
    skipNext,
    getPrevious,
    getNext
  };
}
