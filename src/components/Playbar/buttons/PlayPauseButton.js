import React, { useCallback } from "react";
import {
  Play,
  Pause
} from './icons';
import useLongPress from '../../../hooks/useLongPress';


export default function PlayPauseButton({ state, onClick, disabled, setShowAudioControls}) {

  const onLongPress = useCallback(() => {
    setShowAudioControls(s => !s);
  }, [setShowAudioControls])

  const longPressEvents = useLongPress(onLongPress);

  function getIcon() {
    switch (state) {
      case "play":
        return <Pause />;
      case "pause":
      default:
        return <Play />;
    }
  }

  return (
    <button onClick={onClick} disabled={disabled} {...longPressEvents} className="c-playpause-button">
      { getIcon() }
    </button>
  );
}
