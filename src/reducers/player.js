export default function player(state = {}, action) {
  switch (action.type) {
    case "PLAY_PODCAST": {
      return {
        url: action.data.url,
        state: "play"
      };
    }
    case "PAUSE_PODCAST": {
      return {
        url: state.url,
        state: "pause"
      };
    }
    default:
      return state;
  }
}
