export default function player(state = {}, action) {
  return {
    episode: episode(state.episode, action),
    podcastMeta: podcastMeta(state.podcastMeta, action),
    state: playerState(state.state, action),
    duration: duration(state.duration, action)
  }
}

function playerState(state = "disabled", action) {
  switch (action.type) {
    case "PLAYER_LOAD_EPISODE":
      return "load";
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

function duration(state = 0, action) {
  switch (action.type) {
    case "PLAYER_UPDATE_DURATION":
      return action.data.value
    case "PLAYER_LOAD_EPISODE":
      return 0;
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

export function isDisabled(state) {
  return state.state === 'disabled' || state.duration === 0;
}

export function isInPlayer(state, episode) {
  let episodeUrl;

  if (typeof episode.media !== "undefined") {
    episodeUrl = episode.media.url;
  } else {
    console.log("Redacted podcast episode.", episode);
    return false;
  }

  if (
    state.episode && state.episode.media &&
    (state.episode.media.url === episodeUrl)
  ) {
    return true;
  }

  return false;
}

export function isPlaying(state, episode) {
  return isInPlayer(state, episode) &&
    (state.state === "play" || state.state === "load");
}
