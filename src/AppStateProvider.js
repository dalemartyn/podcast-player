import React, { createContext, useContext } from 'react';

export const AppStateContext = createContext(null);
export const AppDispatchContext = createContext(null);

export function useAppState() {
  return useContext(AppStateContext);
}

export function useAppDispatch() {
  return useContext(AppDispatchContext);
}

const initialState = {
  feed: {},
  player: {},
}

function appReducer(state, action) {
  switch (action.type) {
    case "PLAY_PODCAST": {
      return {
        ...state,
        player: {
          ...action.data,
          state: "play"
        }
      };
    }
    case "PAUSE_PODCAST": {
      return {
        ...state,
        player: {
          ...state.player,
          state: "pause"
        }
      };
    }
    case "SET_FEED": {
      return {
        ...state,
        feed: action.data
      }
    }
    default:
      return state;
  }
}

export default function AppStateProvider({children}) {
  const [state, dispatch] = React.useReducer(appReducer, initialState);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
}
