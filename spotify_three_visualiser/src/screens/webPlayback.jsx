import React, { useEffect, useState } from 'react';
import {  } from "./SpotifyApi";

const SpotifyPlayer = ({ accessToken }) => {
  const [isReady, setReady] = useState(false);
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const player = new window.Spotify.Player({
        name: 'Web Playback SDK Quick Start Player',
        getOAuthToken: cb => { cb(accessToken); },
        volume: 0.5,
      });

      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
        setReady(true);
      });

      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });

      player.addListener('initialization_error', ({ message }) => {
        console.error('Initialization error:', message);
      });

      player.addListener('authentication_error', ({ message }) => {
        console.error('Authentication error:', message);
      });

      player.addListener('account_error', ({ message }) => {
        console.error('Account error:', message);
      });

      player.connect();
      setPlayer(player);
    };
  }, [accessToken]);

  return (
    <div>
      <h1>Spotify Web Playback SDK Quick Start</h1>
      {isReady ? (
        <button onClick={() => player.togglePlay()}>Toggle Play</button>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SpotifyPlayer;
