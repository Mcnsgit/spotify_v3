const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

const port = 8080;
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

const spotify_client_id = '1f42356ed83f46cc9ffd35c525fc8541';
const spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET
const spotify_redirect_uri = 'http://localhost:3001'


const generateRandomString = function (length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

app.get('/auth/login', (req, res) => {
  const scope = [
    "user-read-email",
    "user-read-private",
    "user-modify-playback-state",
    "user-read-playback-state",
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-position",
    "user-top-read",
    "playlist-read-private",
  ].join(' ');
  const state = generateRandomString(16);
  const auth_query_parameters = new URLSearchParams({
    response_type: "code",
    client_id: spotify_client_id,
    scope: scope,
    redirect_uri: spotify_redirect_uri,
    state: state,
  });
  res.redirect('https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString());
});

app.get('/auth/callback', async (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;

  if (state === null) {
    res.redirect('/#' + new URLSearchParams({ error: 'state_mismatch' }).toString());
  } else {
    try {
      const response = await axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: new URLSearchParams({
          code: code,
          redirect_uri: spotify_redirect_uri,
          grant_type: 'authorization_code',
        }),
        headers: {
          'Authorization': 'Basic ' + (Buffer.from(`${spotify_client_id}:${spotify_client_secret}`).toString('base64')),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const { access_token, refresh_token, expires_in } = response.data;
      res.redirect('/#' + new URLSearchParams({ access_token, refresh_token, expires_in }).toString());

    } catch (error) {
      console.error('Authentication error:', error);
      res.redirect('/#' + new URLSearchParams({ error: 'invalid_token' }).toString());
    }
  }
});

app.post("/auth/refresh", async (req, res) => {
  const { refresh_token } = req.body;
  try {
    const response = await axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      data: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refresh_token,
      }),
      headers: {
        'Authorization': 'Basic ' + (Buffer.from(`${spotify_client_id}:${spotify_client_secret}`).toString('base64')),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const { access_token, expires_in } = response.data;
    res.status(200).json({ access_token, expires_in });
  } catch (error) {
    console.error('Refreshing token error:', error);
    res.status(500).send('Refreshing token error');
  }
});

app.get('/auth/search', async (req, res) => {
  const access_token = req.query.access_token || null;
  if (access_token === null) {
    res.redirect('/#' + new URLSearchParams({ error: 'access_token_mismatch' }).toString());
  } else {
    const track = req.query.track || null;
    if (track === null) {
      res.redirect('/#' + new URLSearchParams({ error: 'track_mismatch' }).toString());
    } else {
      const response = await axios({
        method: 'get',
        url: 'https://api.spotify.com/v1/search',
        params: {
          q: track,
          type: 'track',
        },
        headers: {
          'Authorization': `Bearer ${access_token}`,
        },  
      });
      res.status(200).json(response.data);
    }
  }
});


app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});