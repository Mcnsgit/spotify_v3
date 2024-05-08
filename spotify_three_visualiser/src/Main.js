import React, { useEffect, useState } from 'react';
import MusicPlayer from './components/visualMusicContainer/MusicPlayer'; // Import MusicPlayer component
import VisualizationArea from './components/visualMusicContainer/Vizualiser'; // Import Visualization component
import SideMenu from './components/sidebar/SideMenu'; // Import SideMenu component
import SpotifyApi from './screens/SpotifyApi'; // This component should manage Spotify API interactions

// The Main component that integrates all parts of your application
const Main = () => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    // Fetch initial data such as playlist and current track here
    SpotifyApi.getPlaylist().then(setPlaylist);
    SpotifyApi.getCurrentTrack().then(setCurrentTrack);
  }, []);

  const handleTrackChange = (track) => {
    setCurrentTrack(track);
    SpotifyApi.playTrack(track.id); // Play track using Spotify API
  };

  return (
    <div className="main-content-area">
      <SideMenu />
      <div className="content">
        <MusicPlayer
          track={currentTrack}
          onTrackChange={handleTrackChange}
        />
        <div className="playlist">
          {/* Display playlist and allow track selection */}
          {playlist.map(track => (
            <div key={track.id} onClick={() => handleTrackChange(track)}>
              {track.name}
            </div>
          ))}
        </div>
        <VisualizationArea track={currentTrack} />
      </div>
    </div>
  );
};

export default Main;
