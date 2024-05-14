import Axios from 'axios';

// Create an Axios instance
 const serverApi = Axios.create({
  baseURL: 'http://localhost:8080',
});

 export const verifyAccessToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access token is required' });
  }
  req.accessToken = authHeader.split(' ')[1];
  next();
};

serverApi.interceptors.response.use(response => {
  return response;
}, error => {
  console.error('API Error:', error.response || error.message || 'Unknown error');
  return Promise.reject(error);
}
);

export default serverApi;

export async function spotifyApiRequest(endpoint, accessToken, method = 'get', params = {}) {
  try {
    const response = await Axios({
      method,
      url: `https://api.spotify.com/v1${endpoint}`,
      params,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`${method} request to ${endpoint} failed:`, error);
    throw error;
  }
}
