import React, { useContext } from 'react';
import { SpotifyApiContext } from '../../utils/SpotifyApiContext';
import { playTrack, pausePlayback, setVolume, skipToNext, skipToPrevious } from '../../utils/SpotifyPlayerApi';
import './controls.module.css';

const AudioControls = () => {
  const { player, currentTrack, accessToken, isPlaying } = useContext(SpotifyApiContext);

  const handlePlayPause = () => {
    if (isPlaying) {
      pausePlayback(player.device_id, accessToken);
    } else {
      playTrack(player.device_id, currentTrack.context_uri, [currentTrack.uri], 0, 0, accessToken);
    }
  };

  const handleSkipNext = () => {
    skipToNext(player.device_id, accessToken);
  };

  const handleSkipPrevious = () => {
    skipToPrevious(player.device_id, accessToken);
  };

  const handleSetVolume = (event) => {
    const volumePercent = parseInt(event.target.value, 10);
    setVolume(volumePercent, player.device_id, accessToken);
  };

  return (
    <div className='controls-container'>
      <button onClick={handleSkipPrevious}>Previous</button>
      <button onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
      <button onClick={handleSkipNext}>Next</button>
      <input type="range" min="0" max="100" onChange={handleSetVolume} />
      </div>
    )
  }
  

export default AudioControls;
