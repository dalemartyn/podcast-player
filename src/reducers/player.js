export default function player(state, action) {
  return {
    episode: episode(state.episode, action),
    podcastMeta: podcastMeta(state.podcastMeta, action),
    state: playerState(state.state, action),
    isSeeking: isSeeking(state.isSeeking, action),
    seekPosition: seekPosition(state.seekPosition, action),
    startAt: startAt(state.startAt, action),
    duration: duration(state.duration, action),
    currentTime: currentTime(state.currentTime, action)
  }
}

function seekPosition(state = 0, action) {
  switch (action.type) {
    case "PLAYER_IS_SEEKING":
      return action.data.value
    default:
      return state;
  }
}

function isSeeking(state = false, action) {
  switch (action.type) {
    case "PLAYER_IS_SEEKING":
      return true;
    case "PLAYER_IS_NOT_SEEKING":
      return false;
    default:
      return state;
  }
}

function playerState(state = '', action) {
  switch (action.type) {
    case "PLAYER_LOAD_EPISODE":
      return "load";
    case "PLAYER_CAN_PLAY":
      return (state === "load" ? "play" : state);
    case "PLAYER_PLAY":
      return "play";
    case "PLAYER_PAUSE":
      return "pause";
    default:
      return state;
  }
}

function episode(state = {}, action) {
  switch (action.type) {
    case "PLAYER_LOAD_EPISODE":
      return action.data.episode;
    default:
      return state;
  }
}

function podcastMeta(state = {}, action) {
  switch (action.type) {
    case "PLAYER_LOAD_EPISODE":
      return action.data.podcastMeta;
    default:
      return state;
  }
}

function startAt(state = 0, action) {
  switch (action.type) {
    case "PLAYER_LOAD_EPISODE":
      return 0;
    case "PLAYER_SEEK_TO":
      return action.data.time
    default:
      return state;
  }
}

function duration(state = 0, action) {
  switch (action.type) {
    case "PLAYER_UPDATE_CURRENT_TIME":
      return action.data.duration
    default:
      return state;
  }
}

function currentTime(state = 0, action) {
  switch (action.type) {
    case "PLAYER_UPDATE_CURRENT_TIME":
      return action.data.currentTime
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
