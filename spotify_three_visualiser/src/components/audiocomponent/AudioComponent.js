import React from "react";
import PropTypes from "prop-types";
import SongControls from "./audioControls/AudioControls";
import VolumeControls from "./volumeControls.js/Volume";
import "./AudioComponent.css";

const AudioComponent = ({ stopSong, pauseSong, resumeSong, audioControl }) => (
  <div className="footer">
    <SongControls
      stopSong={stopSong}
      pauseSong={pauseSong}
      resumeSong={resumeSong}
      audioControl={audioControl}
    />
    <VolumeControls />
  </div>
);


AudioComponent.propTypes = {
  stopSong: PropTypes.func,
  pauseSong: PropTypes.func,
  resumeSong: PropTypes.func,
  audioControl: PropTypes.func
};

export default AudioComponent;
