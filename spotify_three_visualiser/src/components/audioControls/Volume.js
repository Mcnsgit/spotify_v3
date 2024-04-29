import React from "react";
import { useStateProvider } from "../../utils/stateProvider";
import axios from "axios";
import styles from "./audioPlayer.module.css";

export default function Volume() {
  const [{ token } ]= useStateProvider();
  const [volume, setVolume] = React.useState(50);

  const handleVolumeChange = async (event) => {
    const volumePercent = parseInt(event.target.value, 10);
    await axios.put(
      `https://api.spotify.com/v1/me/player/volume`,
      {},
      {
        params: { volume_percent: volumePercent },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    setVolume(volumePercent);
  };

  return (
    <div className={styles.playerVolume}>
      <p>Volume</p>
      <input
        type="range"
        min={0}
        max={100}
        value={volume}
        onMouseUp={handleVolumeChange}
      />
    </div>
  );
}
