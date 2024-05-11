import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import MusicPlayer from "../components/visualMusicContainer/MusicPlayer";
import axios from "axios";
import "./dashboard.module.css";

import Searchbar from "../components/header/searchcontainer/SearchBar";
import TrackSearchResult from "../components/header/searchcontainer/TrackSearchResults";
import { AppContext } from "../utils/AppContextProvider";
import SideMenu from "../components/sidebar/SideMenu";

const Dashboard = ({ accessToken }) => {
  const { state, dispatch } = useContext(AppContext);
  const [playingTrack, setPlayingTrack] = useState();
  const { currentTrack } = useContext(AppContext);
  const handleChooseTrack = (track, index) => {
    dispatch({ type: "SET_CURRENT_TRACK", track, index });
    setPlayingTrack(track);
  };

  useEffect(() => {
    if (state && !state.currentTrack) return;
    if (!playingTrack) return;
    axios
      .get("http://localhost:3001/auth/search", {
        params: {
          track: playingTrack.title,
          artist: playingTrack.artist,
        },
      })
      .then(res => {
        console.log(res.data);
      });
  }, [state, currentTrack, playingTrack]);

  useEffect(() => {
    if (!accessToken) return;

    return () => {};
  }, [accessToken]);

  return (
        <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
        <div className="dashboardHeader">
        <h1>Dashboard</h1>
        </div>
      <div>
        <Searchbar accessToken={accessToken} />
        <TrackSearchResult
          accessToken={accessToken}
          chooseTrack={handleChooseTrack}
        />
      </div>
        <SideMenu />
        <div className="dashboardContent">
          <div className="musicPlayerContainer">
            <MusicPlayer
              accessToken={accessToken}
              trackUri={currentTrack?.uri}
            />
          </div>
        </div>
      </Container>
  
  );
};

export default Dashboard;

