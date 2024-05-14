import React, { Component } from 'react';
import './devices.css';
import Device from './device';
import media from './media.png';
import serverApi from '../../axios';

class Devices extends Component {
  state = { devices: [], show: false };

  getDevices = async (accessToken) => {
    try {
      const response = await serverApi.get('/me/player/devices', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      this.setState({ devices: response.data.devices });
    } catch (error) {
      console.error('Error fetching devices:', error);
      throw error;
    }
  };

  componentDidMount() {
    const { accessToken } = this.props;
    console.log('accessToken:', accessToken); // Add this line to check the accessToken value
    this.getDevices(accessToken);
  }

  componentDidUpdate(prevProps, prevState) {
    const { accessToken } = this.props;
    if (!prevState.show && this.state.show) {
      console.log('accessToken:', accessToken); // Add this line to check the accessToken value
      this.getDevices(accessToken);
    }
  }

  transferDevice = id => {
    serverApi
      .put('/me/player', { device_ids: [id], play: true })
      .then(this.hideDevices)
      .catch(error => {
        console.error('Error transferring device:', error);
      });
  };

  

  toddleState = () => {
    this.setState((prevState) => {
      return { show: !prevState.show };
    });
  };

  hideDevices = () => {
    this.setState({ show: false });
  };

  renderDevices = () => {
    return this.state.devices.map((d, key) => (
      <Device item={d} key={key} onClick={this.transferDevice} />
    ));
  };

  render = () => (
    <div className="devices-container">
      <i onClick={this.toddleState} className="fa fa-desktop" />
      <div
        onClick={this.hideDevices}
        className={`overlay ${this.state.show ? 'active' : ''}`}
      />
      <div className={`devices ${!this.state.show ? 'hide' : ''}`}>
        <div className="devices-header">
          <h4>Connect to a device</h4>
          <i className="fa fa-question-circle-o" aria-hidden="true" />
        </div>
        <img src={media} alt="devices" />
        {this.state.devices.length > 1 && this.renderDevices()}
        {this.state.devices.length === 1 && (
          <div className="no-results">
            <div>
              Connect lets you play and control Spotify on your devices.
            </div>
            <div>
              Start Spotify on another device and it will magically appear here.
            </div>
          </div>
        )}
        <button
          className="learn-more"
          onClick={() => window.open('https://www.spotify.com/connect/')}
        >
          LEARN MORE
        </button>
        <div className="triangle" />
      </div>
    </div>
  );
}

export default Devices;