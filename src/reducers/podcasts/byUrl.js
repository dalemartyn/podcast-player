import podcast from './podcast';

export default function byUrl(state = {}, action) {
  switch (action.type) {
    case "FETCH_PODCAST_REQUEST":
    case "FETCH_PODCAST_SUCCESS":
    case "FETCH_PODCAST_FAILURE":
      return {
        ...state,
        [action.data.url]: podcast(state[action.data.url], action)
      };
    default:
      return state;
  }
}

