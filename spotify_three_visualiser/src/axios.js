import Axios from 'axios';

// Create an Axios instance
export const serverApi = Axios.create({
  baseURL: 'http://localhost:8080',
});

export function verifyAccessToken(req, res, next) {
  const access_token = req.query.access_token;
  if (!access_token) {
    return res.status(401).json({ error: 'access_token_required' });
  }
  next();
}

// export async function spotifyApiRequest(url, method, params, accessToken) {
//   try {
//     return await axios({
//       method,
//       url: `https://api.spotify.com/v1${url}`,
//       params,
//       headers: {
//         'Authorization': `Bearer ${accessToken}`,
//       },
//     });
//   } catch (error) {
//     console.error(`${method} request to ${url} failed:`, error);
//     throw error;
//   }
// }
