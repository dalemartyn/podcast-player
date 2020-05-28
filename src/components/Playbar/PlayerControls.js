import React from "react";
import PlaybackBar from './PlaybackBar';
import { useAppState } from '../../AppStateProvider';
import { useAudioElement } from '../../AudioElementProvider';
import { isDisabled } from '../../reducers/player';
import {
  SkipBackButton,
  PlayPauseButton,
  SkipForwardButton
} from "./buttons";

export default function PlayerControls() {
  const { player } = useAppState();
  const audioElement = useAudioElement();

  const disabled = isDisabled(player);

  function handlePlayPause() {
    const audio = audioElement.current;
    if (audio.paused) {
      audio.play()
        .catch(e => console.log('playing failed or was interrupted'));
    } else {
      audio.pause();
    }
  }

  function handleSkipBack() {
    const audio = audioElement.current;
    audio.currentTime = audio.currentTime - 10;
  }

  function handleSkipForward() {
    const audio = audioElement.current;
    audio.currentTime = audio.currentTime + 30;
  }

  return (
    <div className="c-player-controls u-padding-left u-padding-right">
      <div className="c-player-controls__buttons u-padding-top-xmicro">
        <SkipBackButton onClick={handleSkipBack} disabled={disabled} />
        <PlayPauseButton onClick={handlePlayPause} disabled={disabled} state={player.state} />
        <SkipForwardButton onClick={handleSkipForward} disabled={disabled} />
      </div>
      <div className="c-player-controls__progress-bar u-padding-bottom-xmicro">
        <PlaybackBar />
      </div>
    </div>
  );
}
