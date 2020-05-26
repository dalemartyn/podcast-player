import podcasts from './podcasts';
import player from './player';

export default function podcastApp(state, action = {}) {
  return {
    podcasts: podcasts(
      state.podcasts,
      action
    ),
    player: player(
      state.player,
      action
    )
  };
}
