import React, { useState, useEffect } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { getVolume, setVolume } from '../../../screens/SpotifyApi'; // Import correct functions

const VolumeSlider = () => {
  const [volume, setVolumeState] = useState(100);

  const handleChange = (value) => setVolumeState(value);
  const handleAfterChange = (value) => {
    setVolumeState(value);
    setVolume(value); // Call the API to change the volume
  };

  useEffect(() => {
    // Call the API to get the current volume
    getVolume().then(volume => setVolumeState(volume));
  }, []);

  return (
    <Slider
      min={0}
      max={100}
      value={volume}
      onChange={handleChange}
      onAfterChange={handleAfterChange} // Use correct event
    />
  );
};

export default VolumeSlider;
