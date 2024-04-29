import React, { useEffect, useState } from "react";
import axios from "axios";
import { useStateProvider } from "../utils/stateProvider";
import { reducerCases } from "../utils/Constants";
import { Container } from "react-bootstrap";

export const LibraryPage = () => {
  const [{ token, playlists }, dispatch] = useStateProvider();
  const [showPlaylists, setShowPlaylists] = useState(false);

  useEffect(() => {
    const fetchPlaylists = async () => {
      if (token) {
        const { data } = await axios.get(
          "https://api.spotify.com/v1/me/playlists",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        dispatch({ type: reducerCases.SET_PLAYLISTS, playlists: data.items });
      }
    };
    fetchPlaylists();
  }, [token, dispatch]);

  const fetchPlaylistData = async (selectedPlaylistId) => {
    if (selectedPlaylistId && token) {
      const response = await axios.get(
        `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const playlistData = {
        id: response.data.id,
        name: response.data.name,
        description: response.data.description.startsWith("<a")
          ? ""
          : response.data.description,
        image: response.data.images[0].url,
        tracks: response.data.tracks.items.map(({ track }) => ({
          id: track.id,
          name: track.name,
          artists: track.artists.map((artist) => artist.name),
          image: track.album.images[2].url,
          duration: track.duration_ms,
          album: track.album.name,
          context_uri: track.album.uri,
          track_number: track.track_number,
        })),
      };
      dispatch({
        type: reducerCases.SET_PLAYLIST,
        selectedPlaylist: playlistData,
      });
    }
  };

  return (
    <Container className="library-page">
      <h1>My Playlists</h1>
      <div className="playlist-container">
        {token ? (
          <>
            {showPlaylists ? (
              <>
                {playlists.map((playlist) => (
                  <div
                    className="playlist-card"
                    key={playlist.id}
                    onClick={() => fetchPlaylistData(playlist.id)}
                  >
                    <img src={playlist.images[0].url} alt="playlist" />
                    <p>{playlist.name}</p>
                  </div>
                ))}
              </>
            ) : (
              <button onClick={() => setShowPlaylists(true)}>
                Show Playlists
              </button>
            )}
          </>
        ) : null}
      </div>
    </Container>
  );
};