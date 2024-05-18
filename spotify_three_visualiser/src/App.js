import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Login from "./screens/Login";
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './screens/Dashboard';
import Profile from './screens/Profile';
// import MusicPlayer from "./components/visualMusicContainer/MusicPlayer.js";
// import Playlists from "./components/sections/playlists/modal.js";
import {} from "./screens/SpotifyApi";
import { Provider } from 'react-redux';
import { store } from './index.js';
import { AppProvider } from "./utils/AppContextProvider.js";
// import { setToken } from "./utils/actions/sessionActions.js";
// import { fetchUser} from "./utils/actions/userActions.js";
// import WebPlayback from "./components/audiocomponent/webPlayback.js";
export default function App() {
  const params = new URLSearchParams(window.location.hash.substring(1));
  const token = params.get('access_token');

//   useEffect(() => {
//     // Redirect to the /login path when the application first loads
//     navigate('/login');
//   }, [navigate]);


//   const handleLogin = (token) => {
//     if (token) {
//       navigate('/dashboard');
//     } else {
//       navigate('/login');
//   }
// };

  return (
      <Provider store={store}>
        <AppProvider>
    <div>
        <Routes>
        <Route path="/" element={token ? <Navigate to="/dashboard" /> :<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />

          {/* <Route path="/musicplayer" element={<MusicPlayer />} /> */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    </div>
    </AppProvider>
      </Provider>
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