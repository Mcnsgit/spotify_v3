import React, { useEffect } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import { useStateProvider } from "./utils/stateProvider";
import {LibraryPage} from './screens/LibraryPage';
import Login from "./screens/Login";
import Profile from "./screens/Profile";
import MusicPlayer from "./components/visualMusicContainer/MusicPlayer";
import SpotifyApi from "./screens/SpotifyApi";
import Dashboard from "./screens/Dashboard";
import styles from "./App.module.css";

function App() {
  const [{ token }, dispatch] = useStateProvider();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const newToken = hash.substring(1).split("&")[0].split("=")[1];
      if (newToken !== token) {
        dispatch({ type: 'SET_TOKEN', token: newToken });
      }
    }
  }, [dispatch, token]);

  return (
    <div className={styles.app}>
      <Routes>
        <Route path="/" element={<SpotifyApi />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/player" element={<MusicPlayer />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
