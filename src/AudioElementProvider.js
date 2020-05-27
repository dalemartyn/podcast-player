import React, { createContext, useContext, useRef } from 'react';

export const AudioElementContext = createContext(null);

export function useAudioElement() {
  return useContext(AudioElementContext);
}

export default function AudioElementProvider({children}) {
  const audioElement = useRef(null);

  return (
    <AudioElementContext.Provider value={audioElement}>
      {children}
    </AudioElementContext.Provider>
  );
}
