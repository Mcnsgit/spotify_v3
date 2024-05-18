import React, { Component } from 'react';
import VolumeSider from './volumeSider';
import Devices from '../../devices/devices';
import serverApi from '../../../axios'; // Make sure this import is correct

class VolumeControl extends Component {
  state = {
    volume: 1,
    previous: 1,
    clicked: false,
  };

  changeVolume = (value) => {
    serverApi.put(`/me/player/volume?volume_percent=${Math.round(value * 100)}`);
  };

  onOff = () => {
    this.setState((prevState) => ({
      volume: 0,
      previous: prevState.volume,
      clicked: true,
    }));
    this.changeVolume(0);
  };

  onOn = () => {
    this.setState((prevState) => ({
      volume: prevState.previous,
      clicked: false,
    }));
    this.changeVolume(this.state.previous);
  };

  onClick = () => {
    if (!this.state.clicked) {
      this.onOff();
    } else if (this.state.volume === 0) {
      this.onOn();
    } else {
      this.setState({ clicked: false });
    }
  };

  render() {
    return (
      <div className="volume-control-container">
        <Devices />
        <VolumeSider
          value={this.state.volume}
          onClick={this.onClick}
          onChange={(value) => this.setState({ volume: value })}
          onAfterChange={(value) => {
            this.setState({ volume: value });
            this.changeVolume(value);
          }}
        />
      </div>
    );
  }
}

export default VolumeControl;
