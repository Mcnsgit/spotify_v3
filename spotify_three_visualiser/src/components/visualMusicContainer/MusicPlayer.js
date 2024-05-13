import React, { Component } from 'react';
// import { connect } from "react-redux";
// import {setToken} from "../../utils/actions/sessionActions";
// import webPlayback from '../audiocomponent/webPlayback';
// import { bindActionCreators } from "redux";
import ErrorBoundary from '../ErrorBoundary';
// import TrackSearchResult from '../sections/searchcontainer/TrackSearchResults';
// import './styles.css';
// import { Link } from "react-router-dom";
// import SpotifyPlayer from 'react-spotify-web-playback';
// import { lazy, Suspense, useState, useEffect } from 'react';
import withPlayer from '../../hoc/playerHoc';
// import AudioComponent from '../audiocomponent/AudioComponent';
import DetailSection from '../audiocomponent/detailsSection'; 
import SongControls from '../audiocomponent/audioControls/AudioControls'; 
import VolumeControls from '../audiocomponent/volumeControls.js/VolumeControls';
import './MusicPlayer.scss'
import SongSlider from '../audiocomponent/SongSlider';



class MusicPlayer extends Component {
  toSeconds = ms => ms / 1000;

  render = () => {
    const position = this.toSeconds(this.props.trackPosition);
    const duration = this.props.currentSong
      ? this.toSeconds(this.props.currentSong.duration_ms)
      : 1;

    return (
      <ErrorBoundary>
        <div className="player-container">
        {this.props.currentSong.id ? (
          <DetailSection
            ids={
              this.props.currentSong.linked_from.id
                ? `${this.props.currentSong.linked_from.id},${
                    this.props.currentSong.id
                  }`
                : this.props.currentSong.id
            }
            contains={this.props.contains}
            songName={this.props.currentSong.name || ''}
            album={this.props.currentSong.album.uri.split(':')[2]}
            artists={this.props.currentSong.artists || []}
          />
        ) : null}
        <SongControls 
          {...this.props}
          />
          <SongSlider
          isEnabled
          value={position / duration}
          position={position}
          duration={duration}
          onChange={value =>
            this.props.seekSong(Math.round(value * duration * 1000))
          }
          />
          <VolumeControls />          
          </div>
        </ErrorBoundary>
      );
  };
}

export default withPlayer(MusicPlayer);


  
//     }
//   const [play, setPlay] = useState(false);

//   const chooseTrack = (uri) => {
    

//   useEffect(() => {
//     setPlay(!!trackUri);
//   }, [trackUri]);

//   if (!accessToken) return null;

//   return (
//     <ErrorBoundary>
//       <Suspense fallback={<div>Loading...</div>}>
//         <Link to="/dashboard">Back to Dashboard</Link>
//         <div className="musicPlayerContainer">
//           <SpotifyPlayer
//             token={accessToken}
//             showSaveIcon
//             callback={(state) => !state.isPlaying && setPlay(false)}
//             play={play}
//             uris={trackUri ? [trackUri] : []}
//           />
//           <AudioComponent />
//           <Visualizer accessToken={accessToken} trackId={trackUri} />
//         </div>
//       </Suspense>
//     </ErrorBoundary>
//   );
// };

// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators({
//     playTrack, // Assuming this function is correctly imported and set up in playerActions
//     pauseTrack,
//   }, dispatch);
// };

// export default connect(null, mapDispatchToProps)(MusicPlayer);
// import React, { useState, lazy, Suspense, useContext, useEffect } from 'react';
// import ErrorBoundary from '../ErrorBoundary';
// import TrackSearchResult from '../sections/searchcontainer/TrackSearchResults';
// import '../../App.scss';
// import './styles.css';
// import { Link } from "react-router-dom";

// // import { actionTypes } from '../../utils/AppState';
// import { AppContext } from '../../utils/AppContextProvider';
// import SpotifyPlayer from 'react-spotify-web-playback';

// const AudioComponent = lazy(() => import('../audiocomponent/AudioComponent'));
// const Visualizer = lazy(() => import('./Vizualiser'));


// const MusicPlayer = ({ trackUri }) => {
//   const { accessToken,  currentTrack, isPlaying } = useContext(AppContext);
//   const [playingTrack, setPlayingTrack] = useState();
//   const [play, setPlay] = useState(false);

//   function chooseTrack(track) {
//     setPlayingTrack(track);
//   }

//   useEffect(() => {
//     if (!playingTrack) return;
//     console.log(playingTrack);

//     // Your logic here for handling playingTrack
//   }, [playingTrack]);

//   useEffect(() => {
//     setPlay(!!trackUri);
//   }, [trackUri]);

//   if (!accessToken) return null;

//   return (
//     <ErrorBoundary>
//       <Suspense fallback={<div className="loader">Loading, please wait...</div>}>
//         <div className="player"></div>
//       <Link to="/dashboard">Back to Dashboard</Link>
//       <div className="musicPlayerContainer">

          
//         <TrackSearchResult track={playingTrack} chooseTrack={chooseTrack} />
//         <div className="player">
//         <SpotifyPlayer
//           token={accessToken}
//           showSaveIcon
//           callback={(state) => {
//             if (!state.isPlaying) setPlay(false);
//           }}
//           play={play}
//           uris={trackUri ? [trackUri] : []}
//           />
//         </div>
//         <div className="Audiocontrolscontainer">
//         <AudioComponent />
//         </div>
//         <div className="vizualiser">
//           <iframe src='Visualizer' title={Visualizer} />
//         {isPlaying && currentTrack && (
//           <Visualizer trackId={currentTrack.uri} accessToken={accessToken} />
//         )}
//         </div>
//         </div>
//       </Suspense>

//     </ErrorBoundary>
//   );
// };

// export default MusicPlayer;