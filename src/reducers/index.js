import podcasts from './podcasts';
import episodes from './episodes';
import player from './player';

export default function podcastApp(state, action = {}) {
  return {
    podcasts: podcasts(
      state.podcasts,
      action
    ),
    episodes: episodes(
      state.episodes,
      action
    ),
    player: player(
      state.player,
      action
    )
  };
}
