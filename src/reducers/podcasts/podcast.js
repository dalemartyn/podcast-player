export default function podcast(state = {}, action) {
  switch (action.type) {
    case "FETCH_PODCAST_REQUEST": {
      return {
        ...state,
        isFetching: isFetching(state.isFetching, action)
      }
    }
    case "FETCH_PODCAST_SUCCESS": {
      return {
        ...state,
        meta: meta(state.meta, action),
        episodes: episodes(state.episodes, action),
        isFetching: isFetching(state.isFetching, action)
      };
    }
    case "FETCH_PODCAST_FAILURE": {
      return {
        ...state,
        isFetching: isFetching(state.isFetching, action),
        errorMessage: 'Couldn’t load podcast'
      }
    }
    default:
      return state;
  }
}

function meta(state = {}, action) {
  switch (action.type) {
    case "FETCH_PODCAST_SUCCESS":
      return action.data.podcastData.meta
    default:
      return state;
  }
}

function episodes(state = [], action) {
  switch (action.type) {
    case "FETCH_PODCAST_SUCCESS":
      return action.data.podcastData.items
    default:
      return state;
  }
}

function isFetching(state = false, action) {
  switch (action.type) {
    case "FETCH_PODCAST_REQUEST":
      return true;
    case "FETCH_PODCAST_SUCCESS":
    case "FETCH_PODCAST_FAILURE":
      return false;
    default:
      return state;
  }
}
