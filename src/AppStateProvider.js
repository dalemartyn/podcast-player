import React, { createContext, useContext } from 'react';
import { createBrowserHistory } from 'history';

export const AppStateContext = createContext(null);
export const AppDispatchContext = createContext(null);
export const AppHistoryContext = createContext(null);

export function useAppState() {
  return useContext(AppStateContext);
}

export function useAppDispatch() {
  return useContext(AppDispatchContext);
}

export function useAppHistory() {
  return useContext(AppHistoryContext);
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
    case "SET_ROUTE": {
      return {
        ...state,
        route: action.data || { path: 'home' }
      }
    }
    default:
      return state;
  }
}

const initialState = {
  feed: [],
  player: {},
  route: {
    path: 'home'
  }
}

export default function AppStateProvider({children}) {
  const [state, dispatch] = React.useReducer(appReducer, initialState);
  const history = createBrowserHistory();

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        <AppHistoryContext.Provider value={history}>
          {children}
        </AppHistoryContext.Provider>
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
}
