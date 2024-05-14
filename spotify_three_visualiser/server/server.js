const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');


const port= 8080
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

const spotifyClientId = process.env.SPOTIFY_CLIENT_ID;
const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const spotifyRedirectUri = 'http://localhost:3001';

const generateRandomString = length => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length }, () => possible.charAt(Math.floor(Math.random() * possible.length))).join('');
};

// Middleware to verify access token
const verifyAccessToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access token is required' });
  }
  const accessToken = authHeader.split(' ')[1];
  req.accessToken = accessToken;
  next();
};
// Spotify API request helper
async function spotifyApiRequest(url, method, params, accessToken) {
  try {
    const response = await axios({
      method,
      url: `https://api.spotify.com/v1${url}`,
      params,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`${method} request to ${url} failed:`, error);
    throw error;
  }
}

// Login endpoint
app.get('/auth/login', (req, res) => {
  const scope = [
    "user-read-email", "user-read-private", "user-modify-playback-state", "user-read-playback-state",
    "user-read-currently-playing", "user-read-recently-played", "user-read-playback-position", "user-top-read",
    "playlist-read-private"
  ].join(' ');
  const state = generateRandomString(16);
  const queryParams = new URLSearchParams({
    response_type: "code",
    client_id: spotifyClientId,
    scope: scope,
    redirect_uri: spotifyRedirectUri,
    state: state
  }).toString();
  res.redirect(`https://accounts.spotify.com/authorize/?${queryParams}`);
});

// Callback endpoint
app.get('/auth/callback', async (req, res) => {
  const { code, state } = req.query;
  if (!state) {
    return res.redirect('/#' + new URLSearchParams({ error: 'state_mismatch' }).toString());
  }
  try {
    const tokenResponse = await axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      data: new URLSearchParams({
        code: code,
        redirect_uri: spotifyRedirectUri,
        grant_type: 'authorization_code',
      }),
      headers: { 'Authorization': 'Basic ' + Buffer.from(`${spotifyClientId}:${spotifyClientSecret}`).toString('base64') },
    });
    const { access_token, refresh_token, expires_in } = tokenResponse.data;
    res.redirect('/#' + new URLSearchParams({ access_token, refresh_token, expires_in }).toString());
  } catch (error) {
    console.error('Authentication error:', error);
    res.redirect('/#' + new URLSearchParams({ error: 'invalid_token' }).toString());
  }
});


// Refresh token endpoint
app.post('/auth/refresh', async (req, res) => {
  const { refresh_token } = req.body;
  try {
    const tokenResponse = await axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      data: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refresh_token,
      }),
      headers: { 'Authorization': 'Basic ' + Buffer.from(`${spotifyClientId}:${spotifyClientSecret}`).toString('base64') },
    });
    res.json({ access_token: tokenResponse.data.access_token, expires_in: tokenResponse.data.expires_in });
  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(500).send('Token refresh error');
  }
});

app.get('/me/player/devices', verifyAccessToken, async (req, res) => {
  try {
    const data = await spotifyApiRequest('/me/player/devices', 'get', {}, req.accessToken);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/me/player', verifyAccessToken, async (req, res) => {
  try {
    const data = await spotifyApiRequest('/me/player', 'put', req.body, req.query.access_token);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/me/player/play', verifyAccessToken, async (req, res) => {
  try { 
    const data = await spotifyApiRequest('/me/player/play', 'put', {}, req.query.access_token);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Search tracks
app.get('/auth/search', verifyAccessToken, async (req, res) => {
  try {
    const data = await spotifyApiRequest('/search', 'get', { q: req.query.track, type: 'track' }, req.query.access_token);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
