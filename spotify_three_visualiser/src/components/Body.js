import axios from "axios";
import React, { useEffect, useState } from "react";
// import styled from "styled-components";
import { useStateProvider } from "../utils/stateProvider";
import { AiFillClockCircle } from "react-icons/ai";
import {Container } from 'react-bootstrap';
import { reducerCases } from "../utils/Constants";
const Body = ({ headerBackground }) => {
  const [{ token, selectedPlaylist, selectedPlaylistId }, dispatch] = useStateProvider();
  const [selectedPlaylistData, setSelectedPlaylistData] = useState(null);


  useEffect(() => {
    const fetchPlaylistData = async () => {
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
        dispatch({ type: reducerCases.SET_PLAYLIST, selectedPlaylist: playlistData });
        setSelectedPlaylistData(playlistData);
      }
    };
    fetchPlaylistData();
  }, [selectedPlaylistId, token, dispatch]);

  const playTrack = async (
    id,
    name,
    artists,
    image,
    context_uri,
    track_number
  ) => {
    const response = await axios.put(
      `https://api.spotify.com/v1/me/player/play`,
      {
        context_uri,
        offset: {
          position: track_number - 1,
        },
        position_ms: 0,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    if (response.status === 204) {
      const currentPlaying = {
        id,
        name,
        artists,
        image,
      };
      dispatch({ type: reducerCases.SET_PLAYING, currentPlaying });
      dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
    } else {
      dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
    }
  }; 

  const MsToMinutesAndSeconds = ({ ms }) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return (
      <span>
        {minutes}:{seconds < 10 ? "0" : ""}
        {seconds}
      </span>
    );
  };

  return (
    <Container headerBackground={headerBackground}>
      {selectedPlaylistData && (
        <div>
          <h1>{selectedPlaylistData.name}</h1>
          <img src={selectedPlaylistData.image} alt={selectedPlaylistData.name} />
          <p>{selectedPlaylistData.description}</p>
          {selectedPlaylistData.tracks.map((track) => (
            <div key={track.id}>
              <h2>{track.name}</h2>
              <img src={track.image} alt={track.name} />
              <p>{track.artists.join(", ")}</p>
              <p>{track.album}</p>
              <p>
                <AiFillClockCircle />
                {MsToMinutesAndSeconds(track.duration)}
              </p>
            </div>
          ))}
        </div>
      )}
      {selectedPlaylist && (
        <div className="playlist">
          <div className="tracks">
            {selectedPlaylist.tracks.map(
              (
                {
                  id,
                  name,
                  artists,
                  image,
                  duration,
                  album,
                  context_uri,
                  track_number,
                },
                index
              ) => (
                <div
                  className="row"
                  key={id}
                  onClick={() =>
                    playTrack({
                      id,
                      name,
                      artists,
                      image,
                      duration,
                      album,
                      context_uri,
                      track_number,
                    })
                  }
                >
             
                  <div className="col">
                    <span>{index + 1}</span>
                  </div>
                  <div className="col detail">
                    <div className="image">
                      <img src={image} alt="track" />
                    </div>
                    <div className="info">
                      <span className="name">{name}</span>
                      <span>{artists}</span>
                    </div>
                  </div>
                  <div className="col">
                    <span>{album}</span>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </Container>
  );
};

export default Body;


// const   BodyContainer = styled.div`
//   .playlist {
//     margin: 0 2rem;
//     display: flex;
//     align-items: center;
//     gap: 2rem;
//     .image {
//       img {
//         height: 15rem;
//         box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
//       }
//     }
//     .details {
//       display: flex;
//       flex-direction: column;
//       gap: 1rem;
//       color: #e0dede;
//       .title {
//         color: white;
//         font-size: 4rem;
//       }
//     }
//   }
//   .list {
//     .header-row {
//       display: grid;
//       grid-template-columns: 0.3fr 3fr 2fr 0.1fr;
//       margin: 1rem 0 0 0;
//       color: #dddcdc;
//       position: sticky;
//       top: 15vh;
//       padding: 1rem 3rem;
//       transition: 0.3s ease-in-out;
//       background-color: ${({ headerBackground }) =>
//         headerBackground ? "#000000dc" : "none"};
//     }
//     .tracks {
//       margin: 0 2rem;
//       display: flex;
//       flex-direction: column;
//       margin-bottom: 5rem;
//       .row {
//         padding: 0.5rem 1rem;
//         display: grid;
//         grid-template-columns: 0.3fr 3.1fr 2fr 0.1fr;
//         &:hover {
//           background-color: rgba(0, 0, 0, 0.7);
//         }
//         .col {
//           display: flex;
//           align-items: center;
//           color: #dddcdc;
//           img {
//             height: 40px;
//             width: 40px;
//           }
//         }
//         .detail {
//           display: flex;
//           gap: 1rem;
//           .info {
//             display: flex;
//             flex-direction: column;
//           }
//         }
//       }
//     }
//   }