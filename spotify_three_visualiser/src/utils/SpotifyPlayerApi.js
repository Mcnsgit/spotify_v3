import axios from 'axios';

const spotifyApi = axios.create({
  baseURL: 'https://api.spotify.com/v1',
  headers: {
    'Content-Type': 'application/json',
  }
});

const setAuthToken = (token) => {
  spotifyApi.defaults.headers['Authorization'] = `Bearer ${token}`;
};

const getTrackDetails = async (trackId, token) => {
  setAuthToken(token);
  try {
    const response = await spotifyApi.get(`/tracks/${trackId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching track details:', error);
    return null;
  }
};

const getTrackAudioFeatures = async (trackId, token) => {
  setAuthToken(token);
  try {
    const response = await spotifyApi.get(`/audio-features/${trackId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching track audio features:', error);
    return null;
  }
};

const getTrackAudioAnalysis = async (trackId, token) => {
  setAuthToken(token);
  try {
    const response = await spotifyApi.get(`/audio-analysis/${trackId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching track audio analysis:', error);
    return null;
  }
};

const playTrack = async (device_id, context_uri, uris, offset, position_ms, token) => {
  setAuthToken(token);
  const body = {
    context_uri,
    uris,
    offset,
    position_ms
  };
  try {
    await spotifyApi.put(`/me/player/play?device_id=${device_id}`, body);
  } catch (error) {
    console.error('Error playing track:', error);
  }
};

const pausePlayback = async (device_id, token) => {
  setAuthToken(token);
  try {
    await spotifyApi.put(`/me/player/pause?device_id=${device_id}`);
  } catch (error) {
    console.error('Error pausing playback:', error);
  }
};

const setVolume = async (volume_percent, device_id, token) => {
  setAuthToken(token);
  try {
    await spotifyApi.put(`/me/player/volume?volume_percent=${volume_percent}&device_id=${device_id}`);
  } catch (error) {
    console.error('Error setting volume:', error);
  }
};

const skipToNext = async (device_id, token) => {
  setAuthToken(token);
  try {
    await spotifyApi.post(`/me/player/next?device_id=${device_id}`);
  } catch (error) {
    console.error('Error skipping to next track:', error);
  }
};

const skipToPrevious = async (device_id, token) => {
  setAuthToken(token);
  try {
    await spotifyApi.post(`/me/player/previous?device_id=${device_id}`);
  } catch (error) {
    console.error('Error skipping to previous track:', error);
  }
};

export { getTrackDetails, getTrackAudioFeatures, getTrackAudioAnalysis, playTrack, pausePlayback, setVolume, skipToNext, skipToPrevious };