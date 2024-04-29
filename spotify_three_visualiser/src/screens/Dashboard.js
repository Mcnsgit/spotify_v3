import React, { useEffect, useState } from "react";
import "./dashboard.module.css";
import { AiFillClockCircle } from "react-icons/ai";
import axios from "axios";
import SideMenu from "../components/sidebar/SideMenu";
import MusicPlayer from "../components/visualMusicContainer/MusicPlayer";


const Dashboard = () => {
  const [token, setToken] = useState(null);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await axios.get("/token");
        setToken(response.data.access_token);
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };

    const fetchInitialPlaylist = async () => {
      if (!selectedPlaylistId) return;
      try {
        const response = await axios.get(
          `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data) {
          const playlistDetails = {
            id: response.data.id,
            name: response.data.name,
            description: response.data.description,
            image: response.data.images[0]?.url,
            tracks: response.data.tracks.items.map(({ track }) => ({
              id: track.id,
              name: track.name,
              artists: track.artists.map((artist) => artist.name),
              image: track.album.images[2]?.url,
              duration: track.duration_ms,
              album: track.album.name,
              context_uri: track.album.uri,
              track_number: track.track_number,
            })),
          };
          setSelectedPlaylist(playlistDetails);
        }
      } catch (error) {
        console.error("Error fetching playlist:", error);
      }
    };

    fetchToken();
    fetchInitialPlaylist();
  }, [selectedPlaylistId, token]);

  return (
    <>
      <div className="sidebar">
        <SideMenu setSelectedPlaylistId={setSelectedPlaylistId} />
      </div>
      <div className="main_view">
        {selectedPlaylistId && (
          <>
            <div className="playlist">
              <img src={selectedPlaylist?.image} alt="Playlist" />
              <div className="details">
                <strong>Playlist</strong>
                <h1>{selectedPlaylist?.name}</h1>
                <p>{selectedPlaylist?.description}</p>
              </div>
            </div>
            <div className="list">
              <div className="header_row">
                <AiFillClockCircle />
              </div>
              <div className="tracks">
                {selectedPlaylist?.tracks?.map((track, index) => (
                  <div className="row" key={track.id}>
                    <span className="trackNumber">{index + 1}</span>
                    <img src={track.image} alt={track.name} className="trackImage" />
                    <span className="trackName">{track.name}</span>
                    <span className="trackArtist">{track.artists.join(", ")}</span>
                    <span className="trackAlbum">{track.album}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      <MusicPlayer />
    </>
  );
};

export default Dashboard;
