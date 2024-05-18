import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
// import { handleAuthorizationResponse } from '../../../screens/SpotifyApi';
import '../songsPlayer.scss';

// const SliderBar = ({ value, style, className }) => (
//   <div
//     className={className}
//     style={{
//       position: 'absolute',
//       borderRadius: 4,
//       top: 0,
//       bottom: 0,
//       left: 0,
//       width: `${value * 100}%`,
//       ...style,
//     }}
//   />
// );

// const SliderHandle = ({ value, style, className }) => (
//   <div
//     className={className}
//     style={{
//       position: 'absolute',
//       width: 10,
//       height: 10,
//       borderRadius: '100%',
//       transform: 'scale(1)',
//       transition: 'transform 0.2s',
//       top: 0,
//       left: `${value * 100}%`,
//       marginTop: -3,
//       marginLeft: -8,
//       ...style,
//       '&:hover': {
//         transform: 'scale(1.3)',
//       },
//     }}
//   />
// );

const ProgressBar = ({
  value,
  position,
  duration,
  onChange,
}) => {
  const FormattedTime = ({ numSeconds }) => {
    const minutes = Math.floor(numSeconds / 60);
    const seconds = Math.floor(numSeconds - minutes * 60);
    return (
      <div className="formatted-time">
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </div>
    );
  };

  return (
    <div className="song-sider-container">
      <FormattedTime numSeconds={position} />
      <Slider
        min={0}
        max={1}
        step={0.01}
        value={value}
        onChange={onChange}
        className="song-sider"
        style={{ cursor: 'pointer' }}
      />
      <FormattedTime numSeconds={duration || 0} />
    </div>
  );
};

export default ProgressBar;