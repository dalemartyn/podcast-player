export default function feed(state={}, action) {
  switch (action.type) {
    case "SET_FEED":
      return action.data
    default:
      return state;
  }
}
