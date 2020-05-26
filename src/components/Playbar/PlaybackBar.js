import React, { useState, useEffect } from 'react';
import { useAppState } from '../../AppStateProvider';
import ProgressBar from './ProgressBar';

export default function PlaybackBar() {
  const { player } = useAppState();
  const [time, setTime] = useState(0);
  const duration = formatTime(player.duration);

  useEffect(() => {
    if (!player.isSeeking) {
      setTime(player.currentTime);
    } else {
      setTime(player.seekPosition);
    }
  }, [player.currentTime, player.seekPosition, player.isSeeking]);

  return (
    <div className="c-playback-bar">
      <div className="c-playback-bar__progress-time ts-time">{formatTime(time)}</div>
      <div className="c-playback-bar__progress-bar">
        <ProgressBar />
      </div>
      <div className="c-playback-bar__progress-time ts-time">{duration}</div>
    </div>
  );
}

function formatTime(s) {
  if (!s) return '00:00';

  const mins = Math.floor(s / 60);
  const secs = Math.floor(s % 60);

  const pad = (n) => n.toString().padStart(2, '0');

  return pad(mins) + ':' + pad(secs);
}
