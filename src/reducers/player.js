export default function player(state = {}, action) {
  switch (action.type) {
    case "PLAYER_LOAD_EPISODE": {
      return {
        episode: action.data.episode,
        podcastMeta: action.data.podcastMeta,
        state: "load"
      };
    }
    case "PLAYER_CAN_PLAY": {
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
    case "PLAYER_PLAY": {
      return {
        ...state,
        state: "play"
      };
    }
    case "PLAYER_UPDATE_CURRENT_TIME": {
      return {
        ...state,
        duration: action.data.duration,
        currentTime: action.data.currentTime
      };
    }
    case "PLAYER_PAUSE": {
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
