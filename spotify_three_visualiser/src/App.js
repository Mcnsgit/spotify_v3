import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Login from "./screens/Login";
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './screens/Dashboard';
import Profile from './screens/Profile';
import { AppProvider } from "./utils/AppContextProvider.js";
import MusicPlayer from "./components/visualMusicContainer/MusicPlayer.js";
import Playlists from "./components/playlists/Playlists.js";
import SpotifyApi from "./screens/SpotifyApi";

export default function App() {
  const params = new URLSearchParams(window.location.hash.substring(1));
  const token = params.get('access_token');

  return (
    <div>
      <AppProvider token={token}>
        <Routes>
          <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/playlists" element={<Playlists />} />
          <Route path="/musicplayer" element={<MusicPlayer />} />
          <Route path="/callback" element={<SpotifyApi />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </AppProvider>
    </div>
  );
}

// import { reducerCases } from "./utils/Constants";
// import { useStateProvider } from "./utils/stateProvider";
// import Dashboard from "./screens/Dashboard";

  
// const [{ token }, dispatch] = useStateProvider();
// // useEffect(() => {
//   const hash = window.location.hash;
//   if (hash) {
//     const token = hash.substring(1).split("&")[0].split("=")[1];
//     if (token) {
//       dispatch({ type: reducerCases.SET_TOKEN, token });
//     }
//   }
//   document.title = "Spotify";
// }, [dispatch, token]);