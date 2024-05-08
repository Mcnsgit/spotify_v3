import React from "react";
import "./TrackSearch.module.css";

export default function TrackSearchResult({ track, chooseTrack }) {
  function handleChooseTrack() {
    chooseTrack(track);
  }

  if (!track) return null;
   // Handle case where track data might be undefined

  return (
    <div
      className='TrackResults'
      style={{ cursor: "pointer" }}
      onClick={handleChooseTrack}
    >
      <img src={track.albumUrl} alt={`Album cover for ${track.title}`} style={{ height: "64px", width: "64px" }} />
      <div className="ml-3">
        <div>{track.title}</div>
        <div className="text-muted">{track.artist}</div>
        <div className='textMuted'>{track.artist}</div>
      </div>
      </div>
 
 
  );
}