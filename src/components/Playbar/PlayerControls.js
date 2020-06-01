import React from "react";
import PlaybackBar from './PlaybackBar';
import { useAppState } from '../../AppStateProvider';
import { useAudioElement } from '../../AudioElementProvider';
import { isDisabled } from '../../reducers/player';
import {
  PlayPauseButton,
  PlayerButton
} from "./buttons";
import * as Icon from './buttons/icons';
import useSkipControls from '../../hooks/useSkipControls';
import useMediaSession from '../../hooks/useMediaSession';

export default function PlayerControls({currentTime, setShowAudioControls}) {
  const { player } = useAppState();
  const audioElement = useAudioElement();
  const {
    skipPrevious,
    skipNext,
    getPrevious,
    getNext
  } = useSkipControls();
  useMediaSession();

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

  function seekBackward() {
    const audio = audioElement.current;
    audio.currentTime = audio.currentTime - 15;
  }

  function seekForward() {
    const audio = audioElement.current;
    audio.currentTime = audio.currentTime + 30;
  }

  const previous = getPrevious();
  const next = getNext();

  return (
    <div className="c-player-controls u-padding-left u-padding-right">
      <div className="c-player-controls__buttons u-padding-top-micro">

        <PlayerButton onClick={skipPrevious} disabled={!previous}>
          <Icon.SkipPrevious />
        </PlayerButton>

        <PlayerButton onClick={seekBackward} disabled={disabled} size="medium">
          <Icon.SeekBackward />
        </PlayerButton>

        <PlayPauseButton
          onClick={handlePlayPause}
          disabled={disabled}
          setShowAudioControls={setShowAudioControls}
          state={player.state}
        />

        <PlayerButton onClick={seekForward} disabled={disabled} size="medium">
          <Icon.SeekForward />
        </PlayerButton>

        <PlayerButton onClick={skipNext} disabled={!next}>
          <Icon.SkipNext />
        </PlayerButton>
      </div>
      <div className="c-player-controls__progress-bar u-padding-bottom-micro">
        <PlaybackBar currentTime={currentTime} />
      </div>
    </div>
  );
}
