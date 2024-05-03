import { useEffect, useState } from "react";
import axios from "axios";
import './Body.css'
import { AiFillClockCircle } from "react-icons/ai";
import { BsFillPlayFill } from "react-icons/bs";
import { Container } from 'react-bootstrap';

function Body({ headerBackground, token, selectedPlaylist, playerState }) {
  const [selectedPlaylistData, setSelectedPlaylistData] = useState(null);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedPlaylist) {
        const response = await axios.get(
          `https://api.spotify.com/v1/playlists/${selectedPlaylist.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setSelectedPlaylistData(response.data);
      }
    };
    fetchData();
  }, [selectedPlaylist, token]);

  const handleTrackClick = async (track) => {
    const response = await axios.put(
      `https://api.spotify.com/v1/me/player/play`,
      {
        context_uri: track.context_uri,
        offset: {
          position: track.track_number - 1,
        },
        position_ms: 0,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 204) {
      setCurrentlyPlaying(track);
    }
  };

  return (
    <Container>
      {selectedPlaylistData && (
        <>
          <div className="playlist">
            <div className="image">
              <img src={selectedPlaylistData.images[0].url} alt="selected playlist" />
            </div>
            <div className="details">
              <span className="type">
                <strong>Playlist</strong>
              </span>
              <h1 className="title">{selectedPlaylistData.name}</h1>
              <p className="description">{selectedPlaylistData.description}</p>
            </div>
          </div>
          <div className="list">
            <div className="header_row">
              <div className="col">
                <span>#</span>
              </div>
              <div className="col">
                <span>Title</span>
              </div>
              <div className="col">
                <span>Album</span>
              </div>
              <div className="col">
                <span>
                  <AiFillClockCircle />
                </span>
              </div>
            </div>
            <div className="tracks">
              {selectedPlaylistData.tracks.items.map((track, index) => (
                <div
                  className={`row ${
                    currentlyPlaying && currentlyPlaying.id === track.track.id ? "active" : ""
                  }`}
                  key={track.track.id}
                  onClick={() => handleTrackClick(track.track)}
                >
                  <div className="col">
                    <span>{index + 1}</span>
                  </div>
                  <div className="col detail">
                    <div className="image">
                      <img src={track.track.album.images[2].url} alt="track" className="trackImage" />
                      <div className="overlay">
                        <div className="ico">
                          <BsFillPlayFill />
                        </div>
                      </div>
                    </div>
                    <div className="info">
                      <span className="name">{track.track.name}</span>
                      <span>{track.track.artists.map((artist) => artist.name).join(", ")}</span>
                    </div>
                  </div>
                  <div className="col">
                    <span>{track.track.album.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </Container>
  );
}

export default Body;

