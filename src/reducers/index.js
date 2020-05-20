import podcasts from './podcasts';
import player from './player';

export default function podcastApp(state = {}, action = {}) {
  const newState = {
    podcasts: podcasts(
      state.podcasts,
      action
    ),
    player: player(
      state.player,
      action
    )
  }
  console.log(action, newState);
  return newState;
}
