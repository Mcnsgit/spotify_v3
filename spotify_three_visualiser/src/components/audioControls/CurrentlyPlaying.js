
import React, { useState, useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";



export function CurrentTrack({ uri, accessToken, searchResults }) {
  const [play, setPlay] = useState(false);
  const [currentImg, setCurrentImg] = useState("");

  useEffect(() => {
    const chooseTrack = (track) => {
      if (track.uri === uri) setPlay((prevPlay) => !prevPlay);
    };

    if (!accessToken) return;

    const images = searchResults
      ? searchResults.map(chooseTrack).filter((track) => track.uri === uri ? track.imageUrl : "")
      : [];
    setCurrentImg(images.find((img) => img !== "") || currentImg);

  }, [accessToken, uri, searchResults, currentImg]);

  if (!accessToken) return null;

  return (
    <div className="SpotifyWebPlayer">
      <SpotifyPlayer
        styles={{
          bgColor: "#0A0A0A",
          trackNameColor: "#575757",
          trackArtistColor: "#333333",
          sliderColor: "rgb(72, 214, 74)",
        }}
        layout={"responsive"}
        inlineVolume={false}
        token={accessToken}
        uris={uri ? [uri] : []}
        play={play}
        callback={(state) => {
          if (!state.isPlaying) setPlay(false);
        }}
      />
      <div>
        <img src={currentImg} alt="current track" className="CurrentImg" />
      </div>
    </div>
  );
}