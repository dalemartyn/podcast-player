import React, { createContext, useContext, useReducer } from 'react';
import podcastApp from './reducers';
import { byUrl, categories } from './initial-state.json';

export const AppStateContext = createContext(null);
export const AppDispatchContext = createContext(null);

export function useAppState() {
  return useContext(AppStateContext);
}

export function useAppDispatch() {
  return useContext(AppDispatchContext);
}

export default function AppStateProvider({children}) {
  const initialState = {
    podcasts: {
      byUrl,
      categories
    }
  };

  const [state, dispatch] = useReducer(podcastApp, initialState, podcastApp);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
}
