import React,{ Component } from 'react';
import { Container } from 'react-bootstrap';


import MainSection from '../containers/mainSection/mainSection';
import './dashboard.module.css';
import { connect } from 'react-redux';


// import MusicPlayer from '../components/visualMusicContainer/MusicPlayer';  // Controls for music playback

import WebPlaybackReact from './webPlayback';

window.onSpotifyWebPlaybackSDKReady = () => {};


class Dashboard extends Component {
  state = {
    playerLoaded: false,
  };

  render() {
    let webPlaybackSdkProps = {
      playerName: 'Spotify React Player',
      playerInitialVolume: 1.0,
      playerRefreshRateMs: 1000,
      playerAutoConnect: true,
      onPlayerRequestAccessToken: () => this.props.token,
      onPlayerLoading: () => {},
      onPlayerWaitingForDevice: () => {
        this.setState({ playerLoaded: true });
      },
      onPlayerError: (e) => {
        console.log(e);
      },
      onPlayerDeviceSelected: () => {
        this.setState({ playerLoaded: true });
      },
    };


  return (
    <Container fluid className="d-flex flex-column vh-100">
      <header>
        <WebPlaybackReact {...webPlaybackSdkProps} />
      </header>
      <div className="d-flex flex-grow-1">

            <MainSection />

      </div>
      <footer>

      </footer>
    </Container>
  );
};
}
const mapStateToProps = (state) => {
  return {
    token: state.sessionReducer.token,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setCurrentTrack: (track, index) => ({ type: "SET_CURRENT_TRACK", track, index }),
  setToken: (token) => ({ type: "SET_TOKEN", token }),
  setPlayingTrack: (track) => ({ type: "SET_PLAYING_TRACK", track }),
  setPlaylist: (playlist) => ({ type: "SET_PLAYLIST", playlist }),
  setPlaylists: (playlists) => ({ type: "SET_PLAYLISTS", playlists }),
  setPlaying: (playing) => ({ type: "SET_PLAYING", playing }),
  setVolume: (volume) => ({ type: "SET_VOLUME", volume }),
  setShuffle: (shuffle) => ({ type: "SET_SHUFFLE", shuffle }),
  setRepeat: (repeat) => ({ type: "SET_REPEAT", repeat }),
  setSeek: (seek) => ({ type: "SET_SEEK", seek }),
  setRepeatContext: (repeatContext) => ({ type: "SET_REPEAT_CONTEXT", repeatContext }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);



// import React, {  Component } from "react";


// // import { Container } from "react-bootstrap";
// import { connect } from "react-redux";
// // import { bindActionCreators } from "redux";
// import "./dashboard.module.css";
// // import Spinner from "../components/spinner/spinner";
// import WebPlayback from "../components/audiocomponent/webPlayback";
// // import { accessToken } from "../utils/actions/sessionActions";
// import Login from './Login';

// import LeftSection from "../components/sidebar/leftSection";
// import MainSection from "../components/sections/containers/mainSection/mainSection";

// window.onSpotifyWebPlaybackSDKReady = () => {};



// class Dashboard extends Component {
//   state = {
//     playerLoader: false,
// }




// render() {
//   const accessToken = this.props

//   if (!accessToken) {
//     return <Login />;
//   }
  
//   const webPlaybacksdkProps = {
//         playerName: "Web Playback SDK",
//         playerInitialVolume: 1.0,
//         playerRefreshRateMs: 1000,
//         playerAutoConnect: true,
//         onPlayerRequestAccessToken: () => accessToken,
//         onPlayerLoading: () => {},
//         onPlayerWaitingForDevice: () => {
//           this.setState({ playerLoaded: true });
//         },
//         onPlayerError: (e) => {
//           console.log(e);
//         },
//         onPlayerDeviceSelected: () => {
//           this.setState({ playerLoaded: true });
//         },
//       };

//       return (
//       <div className='Dashboard'>
//           <WebPlayback {...webPlaybacksdkProps}>

//             <LeftSection />
//             <MainSection />
      
//         </WebPlayback>
//       </div>
//     );
//   }
// }
// const mapStateToProps = (state) => ({
//   accessToken: state.sessionReducer.token,  // Ensure the state path is correct
// });

// export default connect(mapStateToProps)(Dashboard);
// // const Dashboard = ({ accessToken, setCurrentTrack }) => {
// //   const handleChooseTrack = (track, index) => {
// //     setCurrentTrack(track, index);
// //   };
// //   useEffect(() => {
// //     if (!accessToken) return;
// //     // Additional actions can be dispatched here if needed
// //   }, [accessToken]);

// //   return (
// //     <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
// //       <h1>Dashboard</h1>
// //       <Search />
// //       <TrackSearchResult
// //         accessToken={accessToken}
// //         chooseTrack={handleChooseTrack}
// //       />
// //       <SideMenu />
// //     </Container>
// //   );
// // };

// // const mapStateToProps = (state) => ({
// //   setToken: state.sessionReducer.setToken,
// //   currentTrack: state.sessionReducer.currentTrack,
// //   accessToken: state.sessionReducer.accessToken,
// //   playingTrack: state.sessionReducer.playingTrack,

// //   // Ensure this matches your actual state structure
// // });

// // const mapDispatchToProps = (dispatch) => {
// //   return bindActionCreators({
// //     setCurrentTrack: (track, index) => ({ type: "SET_CURRENT_TRACK", track, index }),  // Assuming the action creator exists
// //   }, dispatch);
// // };

// // export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);



//   // useEffect(() => {
//   //   if (state && !state.currentTrack) return;
//   //   axios
//   //     .get("http://localhost:3001/auth/search", {
//   //       params: {
//   //         track: playingTrack.title,
//   //         artist: playingTrack.artist,
//   //       },
//   //     })
//   //     .then(res => {
//   //       console.log(res.data);
//   //     });
//   // }, [state, currentTrack, playingTrack]);

// //   useEffect(() => {
// //     if (!accessToken) return;

// //     return () => {};
// //   }, [accessToken]);

// //   return (
// //         <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
// //         <div className="dashboardHeader">
// //         <h1>Dashboard</h1>
// //         </div>
// //       <div>
// //         <Search />
// //         <TrackSearchResult
// //           accessToken={accessToken}
// //           chooseTrack={handleChooseTrack}
// //         />
// //       </div>
// //         <SideMenu />
       
// //       </Container>
  
// //   );
// // };

// // export default Dashboard;
//         // <div className="dashboardContent">
//         //   <div className="musicPlayerContainer">
//         //     <MusicPlayer
//         //       accessToken={accessToken}
//         //       trackUri={currentTrack?.uri}
//         //     />
//         //   </div>

