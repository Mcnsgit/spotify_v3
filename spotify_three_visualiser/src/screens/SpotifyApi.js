import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Dashboard from "./Dashboard";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchUser } from '../utils/actions/userActions';
import { setToken } from '../utils/actions/tokenActions';
import {
  playSong,
  stopSong,
  pauseSong,
  resumeSong,
} from '../utils/actions/songActions';

const Spotify = ({ code, setToken: dispatchSetToken, fetchUser: dispatchFetchUser, playSong: dispatchPlaySong, stopSong: dispatchStopSong, pauseSong: dispatchPauseSong, resumeSong: dispatchResumeSong }) => {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresAt, setExpiresAt] = useState(0);

  const fetchAccessToken = useCallback(async () => {
    if (Date.now() < expiresAt) return; // Avoid unnecessary token refresh
    try {
      const response = await axios.post("http://localhost:8080/auth/refresh", { refresh_token: refreshToken });
      const { accessToken, expiresIn } = response.data;
      setAccessToken(accessToken);
      setExpiresAt(Date.now() + expiresIn * 1000);
    } catch (error) {
      console.error("Failed to fetch access token:", error);
      window.location = "/";
    }
  }, [refreshToken, expiresAt]);

  useEffect(() => {
    let hashParams = {};
    let e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }

    if (!hashParams.access_token) {
      window.location.href =
        'https://accounts.spotify.com/authorize?client_id=230be2f46909426b8b80cac36446b52a&scope=playlist-read-private%20playlist-read-collaborative%20playlist-modify-public%20user-read-recently-played%20playlist-modify-private%20ugc-image-upload%20user-follow-modify%20user-follow-read%20user-library-read%20user-library-modify%20user-read-private%20user-read-email%20user-top-read%20user-read-playback-state&response_type=token&redirect_uri=http://localhost:3000/callback';
    } else {
      dispatchSetToken(hashParams.access_token);
      setAccessToken(hashParams.access_token);
      setRefreshToken(hashParams.refresh_token);
      setExpiresAt(Date.now() + hashParams.expires_in * 1000);
      window.history.pushState({}, null, "/dashboard");
    }
  }, [dispatchSetToken]);

  useEffect(() => {
    const timer = setInterval(() => {
      fetchAccessToken();
    }, 60000);
    return () => clearInterval(timer);
  }, [fetchAccessToken]);

  useEffect(() => {
    if (accessToken) {
      dispatchFetchUser(accessToken);
    }
  }, [accessToken, dispatchFetchUser]);

  return <Dashboard code={code} accessToken={accessToken} />;
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      fetchUser,
      setToken,
      playSong,
      stopSong,
      pauseSong,
      resumeSong,
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(Spotify);
// import { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import Dashboard from "./Dashboard";
// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import { fetchUser } from '../utils/actions/userActions';
// import { setToken } from '../utils/actions/tokenActions';
// import {
//   playSong,
//   stopSong,
//   pauseSong,
//   resumeSong,
// } from '../utils/actions/songActions';


// class Spotify extends Component {
//   static audio;

//   componentDidMount() {
//     let hashParams = {};
//     let e,
//       r = /([^&;=]+)=?([^&;]*)/g,
//       q = window.location.hash.substring(1);
//     while ((e = r.exec(q))) {
//       hashParams[e[1]] = decodeURIComponent(e[2]);
//     }

//     if (!hashParams.access_token) {
//       window.location.href =
//         'https://accounts.spotify.com/authorize?client_id=230be2f46909426b8b80cac36446b52a&scope=playlist-read-private%20playlist-read-collaborative%20playlist-modify-public%20user-read-recently-played%20playlist-modify-private%20ugc-image-upload%20user-follow-modify%20user-follow-read%20user-library-read%20user-library-modify%20user-read-private%20user-read-email%20user-top-read%20user-read-playback-state&response_type=token&redirect_uri=http://localhost:3000/callback';
//     } else {
//       this.props.setToken(hashParams.access_token);
//     }
//   }

//   componentWillReceiveProps(nextProps) {
//     if (nextProps.token) {
//       this.props.fetchUser(nextProps.token);
//     }

//     if (this.audio !== undefined) {
//       this.audio.volume = nextProps.volume / 100;
//     }
//   }

//   }

// export default function Spotify(code) {
//   const [accessToken, setAccessToken] = useState();
//   const [refreshToken, setRefreshToken] = useState();
//   const [expiresAt, setExpiresAt] = useState(0);

//   const fetchAccessToken = useCallback(async () => {
//     if (Date.now() < expiresAt) return;  // Avoid unnecessary token refresh
//     try {
//       const response = await axios.post("http://localhost:8080/auth/refresh", { refresh_token: refreshToken });
//       const { accessToken, expiresIn } = response.data;
//       setAccessToken(accessToken);
//       setExpiresAt(Date.now() + expiresIn * 1000);
//     } catch (error) {
//       console.error("Failed to fetch access token:", error);
//       window.location = "/";
//     }
//   }, [refreshToken, expiresAt]);

//   useEffect(() => {
//     const params = new URLSearchParams(window.location.hash.substring(1));
//     const accessToken = params.get("access_token");
//     const refreshToken = params.get("refresh_token");
//     const expiresIn = params.get("expires_in");
//     if (accessToken && refreshToken && expiresIn) {
//       setAccessToken(accessToken);
//       setRefreshToken(refreshToken);
//       setExpiresAt(Date.now() + expiresIn * 1000);
//       window.history.pushState({}, null, "/dashboard");
//     }
//   }, []);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       fetchAccessToken();
//     }, 60000);
//     return () => clearInterval(timer);
//   }, [fetchAccessToken]);

//   return <Dashboard code={code} accessToken={accessToken} />;
// }


// const spotifyApi = axios.create({
//   baseURL: 'https://api.spotify.com/v1',
//   headers: {
//     'Content-Type': 'application/json',
//   }
// });

// const setAuthToken = (token) => {
//   spotifyApi.defaults.headers['Authorization'] = `Bearer ${token}`;
// };

// const getTrackDetails = async (trackId, token) => {
//   setAuthToken(token);
//   try {
//     const response = await spotifyApi.get(`/tracks/${trackId}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching track details:', error);
//     return null;
//   }
// };

// const getTrackAudioFeatures = async (trackId, token) => {
//   setAuthToken(token);
//   try {
//     const response = await spotifyApi.get(`/audio-features/${trackId}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching track audio features:', error);
//     return null;
//   }
// };

// const getTrackAudioAnalysis = async (trackId, token) => {
//   setAuthToken(token);
//   try {
//     const response = await spotifyApi.get(`/audio-analysis/${trackId}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching track audio analysis:', error);
//     return null;
//   }
// };

// const getPlaylistData = async (playlistId, token) => {
//   setAuthToken(token);
//   try {
//     const response = await spotifyApi.get(`/playlists/${playlistId}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching playlist data:', error);
//     return null;
//   } 
// };


// const playTrack = async (device_id, context_uri, uris, offset, position_ms, token) => {
//   setAuthToken(token);
//   const body = {
//     context_uri,
//     uris,
//     offset,
//     position_ms
//   };
//   try {
//     await spotifyApi.put(`/me/player/play?device_id=${device_id}`, body);
//   } catch (error) {
//     console.error('Error playing track:', error);
//   }
// };

// const pausePlayback = async (device_id, token) => {
//   setAuthToken(token);
//   try {
//     await spotifyApi.put(`/me/player/pause?device_id=${device_id}`);
//   } catch (error) {
//     console.error('Error pausing playback:', error);
//   }
// };

// const setVolume = async (volume_percent, device_id, token) => {
//   setAuthToken(token);
//   try {
//     await spotifyApi.put(`/me/player/volume?volume_percent=${volume_percent}&device_id=${device_id}`);
//   } catch (error) {
//     console.error('Error setting volume:', error);
//   }
// };

// const skipToNext = async (device_id, token) => {
//   setAuthToken(token);
//   try {
//     await spotifyApi.post(`/me/player/next?device_id=${device_id}`);
//   } catch (error) {
//     console.error('Error skipping to next track:', error);
//   }
// };

// const skipToPrevious = async (device_id, token) => {
//   setAuthToken(token);
//   try {
//     await spotifyApi.post(`/me/player/previous?device_id=${device_id}`);
//   } catch (error) {
//     console.error('Error skipping to previous track:', error);
//   }
// };

// const getPlaybackState = async (device_id, token) => {
//   setAuthToken(token);
//   try {
//     const response = await spotifyApi.get(`/me/player?device_id=${device_id}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching playback state:', error);
//     return null;
//   }
// };

// const searchTrack = async (query, token) => {
//   setAuthToken(token);
//   try { const response = await spotifyApi.get('/search?q=&remaster%2520track%3ADoxy%2520artist%3AMiles%2520Davis&type=album%2Cplaylist%2Ctrack%2Cartist&market=GB&limit=50');
//   return response.data;
// } catch (error) {
//   console.error('Error searching track:', error);
//   return null;
// }
// }
// export { getTrackDetails, getTrackAudioFeatures , getTrackAudioAnalysis, playTrack, pausePlayback, setVolume, skipToNext, skipToPrevious, setAuthToken, getPlaybackState, searchTrack, getPlaylistData };