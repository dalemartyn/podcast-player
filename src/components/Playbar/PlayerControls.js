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

export default function PlayerControls() {
  const { player } = useAppState();
  const audioElement = useAudioElement();
  const { skipPrevious, skipNext } = useSkipControls();
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

  function handleSeekBackward() {
    const audio = audioElement.current;
    audio.currentTime = audio.currentTime - 10;
  }

  function handleSeekForward() {
    const audio = audioElement.current;
    audio.currentTime = audio.currentTime + 30;
  }

  function handleSkipPrevious() {
    skipPrevious();
  }

  function handleSkipNext() {
    skipNext();
  }

  return (
    <div className="c-player-controls u-padding-left u-padding-right">
      <div className="c-player-controls__buttons u-padding-top-xmicro">

        <PlayerButton onClick={handleSkipPrevious} disabled={disabled}>
          <Icon.SkipPrevious />
        </PlayerButton>

        <PlayerButton onClick={handleSeekBackward} disabled={disabled}>
          <Icon.SeekBackward />
        </PlayerButton>

        <PlayPauseButton onClick={handlePlayPause} disabled={disabled} state={player.state} />

        <PlayerButton onClick={handleSeekForward} disabled={disabled}>
          <Icon.SeekForward />
        </PlayerButton>

        <PlayerButton onClick={handleSkipNext} disabled={disabled}>
          <Icon.SkipNext />
        </PlayerButton>
      </div>
      <div className="c-player-controls__progress-bar u-padding-bottom-xmicro">
        <PlaybackBar />
      </div>
    </div>
  );
}
