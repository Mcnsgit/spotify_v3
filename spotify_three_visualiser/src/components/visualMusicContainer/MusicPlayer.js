import React, { useState, lazy, Suspense, useContext, useEffect } from 'react';
import ErrorBoundary from '../ErrorBoundary';
import TrackSearchResult from '../header/searchcontainer/TrackSearchResults';
import '../../App.module.css';
import './styles.css';
import { Link } from "react-router-dom";

// import { actionTypes } from '../../utils/AppState';
import { AppContext } from '../../utils/AppContextProvider';
import SpotifyPlayer from 'react-spotify-web-playback';

const AudioComponent = lazy(() => import('../audiocomponent/AudioComponent'));
const Visualizer = lazy(() => import('./Vizualiser'));


const MusicPlayer = ({ trackUri }) => {
  const { accessToken,  currentTrack, isPlaying } = useContext(AppContext);
  const [playingTrack, setPlayingTrack] = useState();
  const [play, setPlay] = useState(false);

  function chooseTrack(track) {
    setPlayingTrack(track);
  }

  useEffect(() => {
    if (!playingTrack) return;
    console.log(playingTrack);

    // Your logic here for handling playingTrack
  }, [playingTrack]);

  useEffect(() => {
    setPlay(!!trackUri);
  }, [trackUri]);

  if (!accessToken) return null;

  return (
    <ErrorBoundary>
      <Suspense fallback={<div className="loader">Loading, please wait...</div>}>
        <div className="player"></div>
      <Link to="/dashboard">Back to Dashboard</Link>
      <div className="musicPlayerContainer">

          
        <TrackSearchResult track={playingTrack} chooseTrack={chooseTrack} />
        <div className="player">
        <SpotifyPlayer
          token={accessToken}
          showSaveIcon
          callback={(state) => {
            if (!state.isPlaying) setPlay(false);
          }}
          play={play}
          uris={trackUri ? [trackUri] : []}
          />
        </div>
        <div className="Audiocontrolscontainer">
        <AudioComponent />
        </div>
        <div className="vizualiser">
          <iframe src='Visualizer' title={Visualizer} />
        {isPlaying && currentTrack && (
          <Visualizer trackId={currentTrack.uri} accessToken={accessToken} />
        )}
        </div>
        </div>
      </Suspense>

    </ErrorBoundary>
  );
};

export default MusicPlayer;