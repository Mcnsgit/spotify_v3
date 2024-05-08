// MusicPlayer.js
import React, {useState, lazy, Suspense, useContext, useEffect } from 'react';
import ErrorBoundary from '../ErrorBoundary';
import axios from 'axios';
import TrackSearchResult from '../header/searchcontainer/TrackSearchResults';
import '../../App.module.css';
import './styles.css';
import { actionTypes } from '../../utils/AppState';
import { AppContext } from '../../utils/AppContextProvider';


import SpotifyPlayer from 'react-spotify-web-playback';


const AudioComponent = lazy(() => import('../audioControls/AudioComponent'));
const Visualizer = lazy(() => import('./Vizualiser'));


  const MusicPlayer = ({ trackUri }) => {
    const { accessToken, dispatch  } = useContext(AppContext);
    const [playingTrack, setPlayingTrack] = useState()
    const { currentTrack, isPlaying } = useContext(AppContext);
    const [play , setPlay] = useState(false);


    function chooseTrack(track) {
      setPlayingTrack(track)
    }

    useEffect(() => {
      if (!playingTrack) return

      axios
      .get("http://localhost:8080/auth/search", {
        params: {
          track: playingTrack.title,
          artist: playingTrack.artist,     
    },
  })
  .then(res => {
    const track = res.data.tracks[0];
    dispatch({ type: actionTypes.SET_ACCESS_TOKEN, accessToken });
    dispatch({ type: actionTypes.SET_CURRENT_TRACK, track: track.id });
  })
  .catch(err => console.log(err));
}, [playingTrack, accessToken, dispatch]);
  
    useEffect(() => setPlay(true), [trackUri])

      if (!accessToken) return null
    return (
      <ErrorBoundary>
        <Suspense fallback={<div className="loader">Loading, please wait...</div>}>
          <TrackSearchResult 
          track={playingTrack} chooseTrack={chooseTrack} />
          <SpotifyPlayer token={accessToken} showSaveIcon
          callback={state => {
            if (!state.isPlaying) setPlay(false)
          }}
          play={play}
          uris={trackUri ? [trackUri]  : []} />
          <AudioComponent />
          {isPlaying && currentTrack && (
            <Visualizer trackId={currentTrack.uri} accessToken={accessToken} />
          )}
        </Suspense>
      </ErrorBoundary>
    );
  };
  
export default MusicPlayer;