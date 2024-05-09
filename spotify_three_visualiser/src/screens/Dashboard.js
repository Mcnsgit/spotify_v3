import React, { useContext, useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import MusicPlayer from "../components/visualMusicContainer/MusicPlayer";
import axios from "axios";
import SpotifyWebApi from "spotify-web-api-node";
import './dashboard.module.css';
import '../components/visualMusicContainer/styles.css';
import Visualizer from "../components/visualMusicContainer/Vizualiser";
// import Header from "../components/header/Header";
import { AppContext } from "../utils/AppContextProvider";


import TrackSearchResult from "../components/header/searchcontainer/TrackSearchResults";

const spotifyApi = new SpotifyWebApi({
  clientId: "1f42356ed83f46cc9ffd35c525fc8541",
});

const Dashboard = (code) => {
  const { accessToken } = code;
  const { state, dispatch } = useContext(AppContext);
  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [playingTrack, setPlayingTrack] = useState()
  const { currentTrack, isPlaying } = useContext(AppContext);


  const handleChooseTrack = (track, index) => {
    dispatch({ type: 'SET_CURRENT_TRACK', track, index });
    setPlayingTrack(track);
    setSearch("");

  }



  useEffect(() => {
    if (state && !state.currentTrack) return;
    console.log(state, currentTrack, playingTrack);
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
    })       

  }, [state,currentTrack, playingTrack]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken])
  useEffect(() => {
    if (!search) return setSearchResults([])
    if (!accessToken) return

    let cancel = false
    spotifyApi.searchTracks(search).then(res => {
      if (cancel) return
      setSearchResults(
        res.body.tracks.items.map(track => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image
              return smallest
            },
            track.album.images[0]
          )

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          }
        })
      )
    })


    return () => (cancel = true);
  }, [search, accessToken, setSearchResults])
      

  return (
        <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
      <Form.Control
        type="search"
        placeholder="Search Songs/Artists"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
        {searchResults.map(track => (
          <TrackSearchResult
            track={track}
            key={track.uri}
            chooseTrack={handleChooseTrack}
          />
        ))}
        {searchResults.length === 0 && (
          <div className="text-center" style={{ whiteSpace: "pre" }}>
            {search === "" ? (
              <p>Start searching for something</p>
            ) : (
              <p>No results found</p>
            )}
          </div>
        )}
      </div>

      <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>

        <div className="dashboardHeader">
          <h1>Dashboard</h1>
        </div>
        <div className="musicPlayerContainer">
          <TrackSearchResult track={currentTrack} chooseTrack={handleChooseTrack} />
          <MusicPlayer trackUri={currentTrack?.uri} />
        </div>
        <div className="vizualiserContainer">
          <iframe src='Visualizer' title={Visualizer} />
          {playingTrack && (
            <Visualizer trackId={currentTrack.uri} accessToken={accessToken} />
          )}

        </div>
      </Container>
      <Container className="dashboard-container">
      <h1>Dashboard</h1>
      <MusicPlayer accessToken={accessToken} trackUri={currentTrack?.uri} />
      {isPlaying && <div>Visualizing {currentTrack?.title}</div>}
    </Container>
    </Container>
    

    

  );

}

export default Dashboard;
