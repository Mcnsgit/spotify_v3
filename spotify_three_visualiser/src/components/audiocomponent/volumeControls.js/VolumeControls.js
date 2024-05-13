import React, { Component } from "react";
import Devices from '../../devices/device';
import VolumeSlider from './volumeSlider';
import spotifyApi from "../../../axios";
import "./VolumeControls.css";

class VolumeControls extends Component {
  state = {
    volume: 1,
    previous: 1,
    clicked: false
  };

  changeVolume = value => {
    spotifyApi.put(`/me/player/volume?volume_percent=${Math.round(value * 100)}`);
  };

  onOff = () => {
    this.setState(prevState => {
      return { volume: 0, previous: prevState.volume, clicked: true };
    });
    this.changeVolume(0);
  };
    onOn = () => {
      this.setState(prevState => {
        return { volume: prevState.previous, clicked: false };
      });
      this.changeVolume(this.state.previous);
    };
  
    onClick = () => {
      if (!this.state.clicked) {
        this.onOff();
      } else {
        if (this.state.volume === 0) {
          this.onOn();
        } else {
          this.setState({ clicked: false });
        }
      }
    };

    render = () => (
      <div className="volume-control-container">
        <Devices />
        <VolumeSlider
          value={this.state.volume}
          onClick={this.onClick}
          onChange={value => {
            this.setState({ volume: value });
          }}
          onChangeEnd={value => {
            this.setState({ volume: value });
            this.changeVolume(value);
          }}
        />
      </div>
    );
  }
  
  export default VolumeControls;
  



//   render() {
//     return (
//       <div className="volume-container">
//         <i className="fa fa-volume-up" aria-hidden="true" />
//         <input
//           className="volume"
//           type="range"
//           min={0}
//           max={100}
//           value={this.state.volume}
//           onChange={this.updateVolume}
//         />
//       </div>
//     );
//   }
// }

// VolumeControls.propTypes = {
//   volume: PropTypes.number,
//   updateVolume: PropTypes.func
// };

// export default VolumeControls;




//   const [{ token } ]= useStateProvider();
//   const [volume, setVolume] = React.useState(50);

//   const handleVolumeChange = async (event) => {
//     const volumePercent = parseInt(event.target.value, 10);
//     await axios.put(
//       `https://api.spotify.com/v1/me/player/volume`,
//       {},
//       {
//         params: { volume_percent: volumePercent },
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     setVolume(volumePercent);
//   };

//   return (
//     <div className={styles.playerVolume}>
//       <p>Volume</p>
//       <input
//         type="range"
//         min={0}
//         max={100}
//         value={volume}
//         onMouseUp={handleVolumeChange}
//       />
//     </div>
//   );
// }


// import React from "react";
// // import styled from "styled-components"
// import { useStateProvider } from "../../../utils/stateProvider";
// import axios from "axios";
// import styles from "../../audioPlayer.module.css";
// export default function Volume() {
//   const [{ token }] = useStateProvider();
//   const setVolume = async (e) => {
//     await axios.put(
//       `https://api.spotify.com/v1/me/player/volume`,
//       {},
//       {
//         params: {
//           volume_percent: parseInt(e.target.value),
//         },
//         headers: {
//           Authorization: "Bearer " + token,
//           "Content-Type": "application/json",
//         },
//       }
//     );
//   };
//   return (
//     <div className={styles.playerVolume}>
//       <p>Volume</p> <p>{token}</p> <p>{setVolume}</p>
//       <input onMouseUp={(e) => setVolume(e)} type="range" min={0} max={100} />
//     </div>
//   );
// }

// const Container = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   align-items: center;
//   margin-right: 2rem;
//   margin-top: -0.5rem;
//   input {
//     width: 8rem;
//     border-radius: 2rem;
//     height: 0.4rem;
//   }
// `;