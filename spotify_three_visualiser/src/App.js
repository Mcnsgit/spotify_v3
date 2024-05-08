import "bootstrap/dist/css/bootstrap.min.css"
import React from "react";
import Login from "./screens/Login";
import Spotify from "./screens/SpotifyApi";
import { Routes, Route, Navigate } from 'react-router-dom';
// import ErrorBoundary from "./components/ErrorBoundary.js";
import Dashboard from './screens/Dashboard';
import Profile from './screens/Profile';
import { AppProvider } from "./utils/AppContextProvider.js";
import {reducer} from "./utils/AppState.js";
import MusicPlayer from "./components/visualMusicContainer/MusicPlayer.js";

export default function App() {
  const params = new URLSearchParams(window.location.hash.substring(1));
  const token = params.get('access_token');

  return (
    <div>

        <AppProvider initialState={{ token }} reducer={reducer}>
          <Routes>
            <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard accessToken={token} />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/musicplayer" element={<MusicPlayer />} />
            <Route path="/callback" element={<Spotify />} />
            <Route path="*" element={<Navigate to="/" />} />
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