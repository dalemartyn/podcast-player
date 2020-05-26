export default function player(state = {}, action) {
  switch (action.type) {
    case "LOAD_PODCAST": {
      return {
        episode: action.data.episode,
        podcastUrl: action.data.podcastUrl,
        state: "load"
      };
    }
    case "CAN_PLAY_PODCAST": {
      let newState;
      if (state.state === "load") {
        newState = "play";
      } else {
        newState = state.state
      }
      return {
        ...state,
        state: newState
      };
    }
    case "PLAY_PODCAST": {
      return {
        ...state,
        state: "play"
      };
    }
    case "UPDATE_CURRENT_TIME": {
      return {
        ...state,
        duration: action.data.duration,
        currentTime: action.data.currentTime
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

export function getEpisodeUrl(player) {
  if (
    player.episode &&
    player.episode.media &&
    player.episode.media.url
  ) {
    return player.episode.media.url;
  }

  return "";
}
