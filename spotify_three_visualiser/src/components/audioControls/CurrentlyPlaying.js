// CurrentlyPlaying.js
import React, { useState, useEffect, useContext } from 'react';
import './audioPlayer.module.css';
import { getTrackDetails } from '../../utils/SpotifyPlayerApi';
import { AppContext } from '../../utils/AppContextProvider';

const CurrentlyPlaying = ({ track, accessToken }) => {
  const { state } = useContext(AppContext);
  const [trackDetails, setTrackDetails] = useState(null);

  useEffect(() => {
    if (track && accessToken) {
      getTrackDetails(track.id, accessToken).then(res => setTrackDetails(res));
    }
  }, [track, accessToken]);

  if (!trackDetails) return <p>Loading track information...</p>;

  const formatTime = (time) => `${Math.floor(time / 60000)}:${((time % 60000) / 1000).toFixed(0).padStart(2, '0')}`;

  return (
    <div className="currently-playing">
      <img src={trackDetails.album.images[0].url} alt={trackDetails.name} className='track-image' />
      <div className="track-info">
        <div className="song-title">{trackDetails.name}</div>
        <div className="song-artist">{trackDetails.artists.map(artist => artist.name).join(', ')}</div>
        <div className="track-duration">{formatTime(trackDetails.duration_ms)}</div>
      </div>
    </div>
  );
};

export default CurrentlyPlaying;