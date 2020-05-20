import React, { createContext, useContext, useReducer } from 'react';
import podcastApp from './reducers';

export const AppStateContext = createContext(null);
export const AppDispatchContext = createContext(null);

export function useAppState() {
  return useContext(AppStateContext);
}

export function useAppDispatch() {
  return useContext(AppDispatchContext);
}

export default function AppStateProvider({children}) {
  const [state, dispatch] = useReducer(podcastApp, undefined, podcastApp);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
}
