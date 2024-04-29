import React from "react";


export default function TrackSearchResult({ track, chooseTrack }) {
  return (
    <div
      className='styles.trackResult'
      style={{ cursor: "pointer" }}
      onClick={() => chooseTrack(track)}
    >
      <img src={track.albumUrl} alt={track.title} style={{ height: "64px", width: "64px", borderRadius: "10px" }} />
      <div className='styles.trackInfo'>
        <div className='styles.trackTitle'>{track.title}</div>
        <div className='styles.textMuted'>{track.artist}</div>
      </div>
    </div>
  );
}
