import React from "react";
import PropTypes from "prop-types";
import SongControls from "../SongControls";
import VolumeControls from "../VolumeControls";
import "./AudioComponent.css";

const AudioComponent = ({ stopSong, pauseSong, resumeSong, audioControl }) => (
  <div className="audio-component">
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
