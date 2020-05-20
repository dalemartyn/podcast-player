import feed from './feed';
import player from './player';

export default function podcastApp(state = {}, action = {}) {
  return {
    feed: feed(
      state.feed,
      action
    ),
    player: player(
      state.player,
      action
    )
  }
}
