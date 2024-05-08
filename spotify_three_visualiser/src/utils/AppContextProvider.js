import React, { createContext, useReducer, useEffect, useState, useCallback, useMemo } from 'react';
import { initialState, reducer, actionTypes } from './AppState';
import axios from 'axios';

export const AppContext = createContext();

export const AppProvider = ({ children, token }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [player, setPlayer] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState('');

  const playTrack = useCallback((track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  }, []);

  const togglePlayPause = useCallback(() => {
    setIsPlaying(prev => !prev);
    if (player) {
      player.togglePlay().catch(err => console.error('Toggle play error:', err));
    }
  }, [player]);

  const handleSetVolume = useCallback((volume) => {
    if (player) {
      player.setVolume(volume / 100).catch(err => {
        console.error('Volume control error:', err);
        setError('Failed to adjust volume');
      });
    }
  }, [player]);

  useEffect(() => {
    // Manage token persistence
    if (!token) return;
    const script = document.createElement('script');
    script.src = "https://sdk.scdn.co/spotify-player.js";
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Web Playback SDK Quick Start Player",
        getOAuthToken: cb => { cb(token); },
        volume: 0.5
      });

      player.addListener('initialization_error', ({ message }) => {
        console.error('Initialization error:', message);
        setError('Initialization error');
      });

      player.addListener('authentication_error', ({ message }) => {
        console.error('Authentication error:', message);
        setError('Authentication error');
      });

      player.addListener('player_state_changed', state => {
        setIsPlaying(!state.paused);
        setCurrentTrack(state.track_window.current_track);
      });

      player.addListener('account_error', ({ message }) => {
        console.error('Account error:', message);
        dispatch({ type: actionTypes.SET_ERROR, error: message });
      });

      player.addListener('playback_error', ({ message }) => {
        console.error('Playback error:', message);
        dispatch({ type: actionTypes.SET_ERROR, error: message });
      });

      player.addListener('player_state_changed', ({ paused, track_window: { current_track }, position, duration }) => {
        dispatch({ type: actionTypes.SET_PLAYING, isPlaying: !paused });
        dispatch({ type: actionTypes.SET_CURRENT_TRACK, track: current_track });
        dispatch({ type: actionTypes.SET_PLAYER_PROGRESS, progress: position });
        dispatch({ type: actionTypes.SET_PLAYER_VOLUME, volume: player.getVolume() });
        dispatch({ type: actionTypes.SET_PLAYER_STATE, playerState: { position, duration } });
      });

      player.connect().catch(err => {
        console.error('Connection error:', err);
        setError('Connection error');
      })

      setPlayer(player);

      // Cleanup
      return () => {
        player.disconnect();
        script.remove();
      };
    };

    script.onerror = () => {
      console.error('Failed to load Spotify player');
      dispatch({ type: actionTypes.SET_ERROR, error: 'Failed to load Spotify player' });
    };

  }, [state.token, state.volume, dispatch, token]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/user/data', { headers: { Authorization: `Bearer ${state.token}` } });
        dispatch({ type: actionTypes.SET_USER_DATA, payload: response.data });
      } catch (error) {
        dispatch({ type: actionTypes.SET_ERROR, error: error.message });
      }
    };

    if (state.token) {
      fetchUserData();
    }
  }, [state.token, dispatch]);

  const statevalue = useMemo(() => ({
    player,
    currentTrack,
    isPlaying,
    playTrack,
    togglePlayPause,
    setPlayer,
    setVolume: handleSetVolume,
    error,
    setError,
    userData: state.userData,
    token: state.token,
    playlists: state.playlists,
  }), [player, currentTrack, isPlaying, playTrack, togglePlayPause, handleSetVolume, error, setError, state.userData, state.token, state.playlists]);


  return (
    <AppContext.Provider value={{ statevalue, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

