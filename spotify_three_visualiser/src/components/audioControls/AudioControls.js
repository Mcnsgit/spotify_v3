//PREV
//PLAY/PAUSE
//NEXT
//SHUFFLE
//LOOP
//REPEAT
//VOLUME
import React,{useEffect} from "react";
// import styled from "styled-components";
import { Container } from "react-bootstrap";

import { useStateProvider } from "../../utils/stateProvider";
import axios from "axios";
import { reducerCases } from "../../utils/Constants";

// import SpotifyWebApi from "spotify-web-api-node";

// const spotifyApi = new SpotifyWebApi({
//   clientId: "1f42356ed83f46cc9ffd35c525fc8541",
// });
export default function CurrentTrack() {
  const [{ token, currentlyPlaying }, dispatch] = useStateProvider();
  useEffect(() => {
    const getCurrentTrack = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data !== "") {
        const { item } = response.data;
        const currentlyPlaying = {
          id: item.id,
          name: item.name,
          artists: item.artists.map((artist) => artist.name),
          image: item.album.images[2] && item.album.images[2].url,
        };
        dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });
      }
    };
    getCurrentTrack();
  }, [token, dispatch, currentlyPlaying]);
  return (
    <Container>
      {currentlyPlaying && (
        <div className="track">
          <div className="track_image">
            <img src={currentlyPlaying.image} alt="currentlyPlayingImg" />
          </div>
          <div className="track_info">
            <h4>{currentlyPlaying.name}</h4>
            <h6>{currentlyPlaying.artists.join(", ")}</h6>
          </div>
        </div>
      )}
    </Container>
  );
}
// const Container = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 2rem;
//   svg {
//     color: #b3b3b3;
//     transition: 0.2s ease-in-out;
//     &:hover {
//       color: white;
//     }
//   }
//   .state {
//     svg {
//       color: white;
//     }
//   }
//   .previous,
//   .next,
//   .state {
//     font-size: 2rem;
//   }
// `;