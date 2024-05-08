import React, { useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import MusicPlayer from "../components/visualMusicContainer/MusicPlayer";
import './dashboard.module.css';
import '../components/visualMusicContainer/styles.css';
import Header from "../components/header/Header";
import { AppContext } from "../utils/AppContextProvider";

const Dashboard = ({ accessToken }) => {
  const { state } = useContext(AppContext);
  const { currentTrack } = state || {}; // Correctly access currentTrack from state

  // function chooseTrack(track, index) {
  //   dispatch({ type: 'SET_CURRENT_TRACK', track: track, index: index });
  // }

  useEffect(() => {
    if (state && !state.currentTrack) return; // Properly check for currentTrack existence
  }, [state,currentTrack]);

  return (
    <Container className="dashboard-container">
      <Header />
      <h1>Dashboard</h1>
      <Container fluid className="player">
      <MusicPlayer accessToken={accessToken} trackUri={currentTrack} />
      </Container>
    </Container>
  );
};

export default Dashboard;
    /* {ready && <Vizualiser />}
      <div className={`fullscreen  ${ready ? 'ready' : 'notready'} ${ready && 'clicked'}`}>
        <div className="controls">
          <button onClick={() => set(true)}>Play</button>
          <button onClick={() => set(false)}>Pause</button>
        </div>      
        </div>

      </div> */