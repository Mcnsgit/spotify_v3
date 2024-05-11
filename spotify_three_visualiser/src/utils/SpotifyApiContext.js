import React, { createContext, useState, useEffect, useMemo, useCallback } from "react";


export const SpotifyApiContext = createContext();

export const SpotifyApiProvider = ({ children, token }) => {
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

      player.connect().catch(err => {
        console.error('Connection error:', err);
        setError('Connection error');
      });

      setPlayer(player);

      return () => {
        player.disconnect();
        script.remove();
      };
    };
  }, [token]);

  const contextValue = useMemo(() => ({
    player,
    currentTrack,
    isPlaying,
    playTrack,
    togglePlayPause,
    setPlayer,
    setVolume: handleSetVolume,
    error
  }), [player, currentTrack, isPlaying, playTrack, togglePlayPause, handleSetVolume, error]);

  return (
    <SpotifyApiContext.Provider value={contextValue}>
      {children}
    </SpotifyApiContext.Provider>
  );
};
