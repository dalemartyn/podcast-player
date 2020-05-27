import React from "react";
import PlaybackBar from './PlaybackBar';
import { useAppState } from '../../AppStateProvider';
import { useAudioElement } from '../../AudioElementProvider';
import { isDisabled } from '../../reducers/player';

export default function PlayerControls() {
  const { player } = useAppState();
  const audioElement = useAudioElement();

  const disabled = isDisabled(player);

  function handlePlayPause() {
    const audio = audioElement.current;
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  }

  function handleSkipBack() {
    const audio = audioElement.current;
    audio.currentTime = audio.currentTime - 15;
  }

  function handleSkipForward() {
    const audio = audioElement.current;
    audio.currentTime = audio.currentTime + 30;
  }

  function getButtonLabel() {
    switch (player.state) {
      case "pause":
        return "play";
      case "play":
        return "pause";
      default:
        return "-";
    }
  }

  return (
    <div className="c-player-controls">
      <div>
        <button onClick={() => { handleSkipBack() } } disabled={disabled}>
          -15
        </button>
        <button onClick={() => { handlePlayPause() } } disabled={disabled}>
          { getButtonLabel() }
        </button>
        <button onClick={() => { handleSkipForward() } } disabled={disabled}>
          +30
        </button>
      </div>
      <PlaybackBar />
    </div>
  );
}
