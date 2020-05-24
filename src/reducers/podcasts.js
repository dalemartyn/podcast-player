export default function podcasts(state = {}, action) {
  return {
    byUrl: byUrl(state.byUrl, action),
    categories: state.categories
  }
}

function byUrl(state = {}, action) {
  switch (action.type) {
    case "ADD_PODCAST": {
      return {
        ...state,
        [action.data.url]: podcast(state[action.data.url], action)
      }
    }
    default:
      return state;
  }
}

function podcast(state = {}, action) {
  switch (action.type) {
    case "ADD_PODCAST":
      return {
        ...state,
        ...action.data.podcastData.meta
      };
    default:
      return state;
  }
}
