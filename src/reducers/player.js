export default function player(state = {}, action) {
  switch (action.type) {
    case "PLAY_PODCAST": {
      return {
        episode: action.data.episode,
        podcastUrl: action.data.podcastUrl,
        state: "play"
      };
    }
    case "PAUSE_PODCAST": {
      return {
        ...state,
        state: "pause"
      };
    }
    default:
      return state;
  }
}
