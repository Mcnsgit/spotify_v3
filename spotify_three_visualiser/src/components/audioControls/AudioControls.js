// AudioControls.js
import React, { useContext } from 'react';
import { SpotifyApiContext } from '../../utils/SpotifyApiContext';
import './controls.module.css';

const AudioControls = () => {
  const { togglePlayPause, isPlaying, setVolume } = useContext(SpotifyApiContext);


  const handleSetVolume = (event) => {
    const volumePercent = parseInt(event.target.value, 10);
    setVolume(volumePercent);
  };

  return (
    <div className='controls-container'>
      <button onClick={togglePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
      <input type="range" min="0" max="100" onChange={handleSetVolume} />
    </div>
  );
};

export default AudioControls;