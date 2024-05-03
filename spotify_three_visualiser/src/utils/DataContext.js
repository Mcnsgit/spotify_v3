import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({ user: null, playlists: [] });

  useEffect(() => {
    async function fetchData() {
      const userRes = await axios.get('https://api.spotify.com/v1/me', { headers: getAuthHeader() });
      const playlistsRes = await axios.get('https://api.spotify.com/v1/me/playlists', { headers: getAuthHeader() });

      setData({ user: userRes.data, playlists: playlistsRes.data.items });
    }
    fetchData();
  }, []);

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
}

const getAuthHeader = () => ({
  Authorization: `Bearer ${window.localStorage.getItem('spotify_token')}`,
  "Content-Type": "application/json",
});

export const useData = () => useContext(DataContext);
