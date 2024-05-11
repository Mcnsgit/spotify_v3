import React from 'react'
export default function TrackSearchResult({ track, chooseTrack }) {
  function handlePlay() {
    if (track) {
      chooseTrack(track);
    }
  }

  if (!track) {
    // Optionally return a placeholder or nothing if there's no track data
    return <div className="d-flex m-2 align-items-center">Loading...</div>;
  }
  return (
    <div
      className="d-flex m-2 align-items-center"
      style={{ cursor: "pointer" }}
      onClick={handlePlay}
    >
    <img src={track.album_url || 'default_album.png'} alt={`${track.title} album cover`} style={{ height: "64px", width: "64px" }} />
      <div className="ml-3">
        <div>{track.title || 'Unknown Title'}</div>
        <div className="text-muted">{track.artist || 'Unknown Artist'}</div>
      </div>
    </div>
  );
}