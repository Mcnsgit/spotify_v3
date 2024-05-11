import React, { useState, useEffect, useContext, memo } from 'react';
import './audioPlayer.module.css';
import { getTrackDetails } from '../../utils/SpotifyPlayerApi';
import { AppProvider } from '../../utils/AppContextProvider';

const CurrentlyPlaying = memo(({ track, accessToken }) => {
  const { state } = useContext(AppProvider);
  const { currentTrack } = state;
  const [trackDetails, setTrackDetails] = useState(null);

  useEffect(() => {
    if (!track || !accessToken) return;
    const debounce = setTimeout(() => {
      getTrackDetails(currentTrack.id, accessToken).then(res => setTrackDetails(res));
    }, 500);
    return () => clearTimeout(debounce);
  }, [currentTrack, track, accessToken]);

  if (!trackDetails) return <p>Loading track information...</p>;

  const formatTime = (time) => `${Math.floor(time / 60000)}:${((time % 60000) / 1000).toFixed(0).padStart(2, '0')}`;

  return (
    <div className="currently-playing">
      <img src={trackDetails.album.images[0].url} alt={trackDetails.name} className='track-image' />
      <div className="track-info">
        <div className="song-title">{trackDetails.name}</div>
        <div className="song-artist">{trackDetails.artists.map(artist => artist.name).join(', ')}</div>
        <div className="track-duration">{formatTime(trackDetails.duration_ms)}</div>
      </div>
    </div>
  );
});

export default CurrentlyPlaying;


//from spotify v2
// import React, { useState, useEffect } from "react";
// import SpotifyPlayer from "react-spotify-web-playback";



// export function CurrentTrack({ uri, accessToken, searchResults }) {
//   const [play, setPlay] = useState(false);
//   const [currentImg, setCurrentImg] = useState("");

//   useEffect(() => {
//     const chooseTrack = (track) => {
//       if (track.uri === uri) setPlay((prevPlay) => !prevPlay);
//     };

//     if (!accessToken) return;

//     const images = searchResults
//       ? searchResults.map(chooseTrack).filter((track) => track.uri === uri ? track.imageUrl : "")
//       : [];
//     setCurrentImg(images.find((img) => img !== "") || currentImg);

//   }, [accessToken, uri, searchResults, currentImg]);

//   if (!accessToken) return null;

//   return (
//     <div className="SpotifyWebPlayer">
//       <SpotifyPlayer
//         styles={{
//           bgColor: "#0A0A0A",
//           trackNameColor: "#575757",
//           trackArtistColor: "#333333",
//           sliderColor: "rgb(72, 214, 74)",
//         }}
//         layout={"responsive"}
//         inlineVolume={false}
//         token={accessToken}
//         uris={uri ? [uri] : []}
//         play={play}
//         callback={(state) => {
//           if (!state.isPlaying) setPlay(false);
//         }}
//       />
//       <div>
//         <img src={currentImg} alt="current track" className="CurrentImg" />
//       </div>
//     </div>
//   );
// }
