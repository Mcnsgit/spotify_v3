import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import {LibraryPage} from './screens/LibraryPage'; 
import Login from "./screens/Login";
import Dashboard from "./screens/Dashboard";
import Profile from "./screens/Profile";
import MusicPlayer from "./components/visualMusicContainer/MusicPlayer";
import styles from "./App.module.css";
// import SpotifyApi from "./screens/SpotifyApi";

function App() {
  return (
    <div className={styles.app}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/player" element={<MusicPlayer />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
    </div>
  );
}

export default App;