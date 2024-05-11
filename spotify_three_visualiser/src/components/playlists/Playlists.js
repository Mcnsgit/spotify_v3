import React, { useContext, useEffect } from "react";
import { SpotifyApiContext } from "../../utils/SpotifyApiContext";
import styled from "styled-components";
import axios from "axios";

export default function Playlists() {
  // Correctly using useContext to pull the entire context object
  const context = useContext(SpotifyApiContext);
  const { state, dispatch } = context;
  const { token, playlists } = state;
  // Ensure state is not undefined
  useEffect(() => {
    if (!token) {
      console.error("No token available");
      return;
    }
  if (!context || !context.state) {
    console.error('App context or state is undefined');
    return null; // or some fallback UI
  }
  
  
  
  const getPlaylistData = async () => {
      try {
        const response = await axios.get("https://api.spotify.com/v1/me/playlists", {
            headers: {
                Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        });
        if (response.data && response.data.items) {
          const playlists = response.data.items.map(({ name, id }) => ({ name, id }));
          dispatch({ type: "SET_PLAYLISTS", playlists });
        } else {
          throw new Error('Invalid data structure from API');
        }
      } catch (error) {
        console.error("Failed to fetch playlists:", error);
      }
    };

    getPlaylistData();
  }, [token, dispatch, context]);

  return (
    <Container>
      {playlists && playlists.length > 0 ? (
        <ul>
          {playlists.map(({ name, id }) => (
            <li key={id} onClick={() => dispatch({ type: "SET_PLAYLIST_ID", selectedPlaylistId: id })}>
              {name}
            </li>
          ))}
        </ul>
      ) : <p>No playlists found</p>}
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  overflow: hidden;

  ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    height: 52vh;
    max-height: 100%;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.7rem;
      &-thumb {
        background-color: rgba(255, 255, 255, 0.2);
      }
    }
    li {
      display: flex;
      gap: 1rem;
      cursor: pointer;
      transition: 0.3s ease-in-out;
      &:hover {
        color: white;
      }
    }
  }
`;