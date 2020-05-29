import { useAppState } from '../AppStateProvider';
import { getPodcastEpisodes } from '../reducers/podcasts';
import { findIndex } from 'lodash-es';
import useLoadEpisode from './useLoadEpisode';

export default function usePlayer() {
  const { player, podcasts } = useAppState();
  const loadEpisode = useLoadEpisode();

  function skipPrevious() {
    const episodes = getPodcastEpisodes(podcasts, player.podcastMeta.url);
    const currentEpisodeIndex = findIndex(episodes, {
      guid: player.episode.guid
    });
    const previousEpisode = episodes[currentEpisodeIndex - 1];
    loadEpisode(previousEpisode, player.podcastMeta);
  }

  function skipNext() {
    const episodes = getPodcastEpisodes(podcasts, player.podcastMeta.url);
    const currentEpisodeIndex = findIndex(episodes, {
      guid: player.episode.guid
    });
    const nextEpisode = episodes[currentEpisodeIndex + 1];
    loadEpisode(nextEpisode, player.podcastMeta);
  }

  return {
    skipPrevious,
    skipNext
  };
}
