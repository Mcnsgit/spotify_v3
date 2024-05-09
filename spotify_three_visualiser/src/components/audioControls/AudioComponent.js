import React, { useContext, useEffect } from 'react';
import { SpotifyApiContext } from '../../utils/SpotifyApiContext';
import AudioControls from './AudioControls';
import CurrentlyPlaying from './CurrentlyPlaying';

const AudioComponent = () => {
  const { player, isPlaying, currentTrack } = useContext(SpotifyApiContext);

  useEffect(() => {
    if (player && isPlaying) {
      player.connect().catch(console.error);
      return () => player.disconnect();
    }
  }, [player, isPlaying]);

  return (
    <div className='player-body'>
      <CurrentlyPlaying track={currentTrack} />
      <AudioControls />
    </div>
  );
};

export default AudioComponent;