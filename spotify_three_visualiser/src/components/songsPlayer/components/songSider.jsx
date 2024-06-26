import React from 'react';
import { Direction, Slider, FormattedTime } from 'react-player-controls';
import '../songsPlayer.scss';
const SliderBar = ({ value, style, className }) => (
  <div
    className={className}
    style={Object.assign(
      {},
      {
        position: 'absolute',
        borderRadius: 4
      },
      {
        top: 0,
        bottom: 0,
        left: 0,
        width: `${value * 100}%`
      },
      style
    )}
  />
);

const SliderHandle = ({ value, style, className }) => (
  <div
    className={className}
    style={Object.assign(
      {},
      {
        position: 'absolute',
        width: 10,
        height: 10,
        borderRadius: '100%',
        transform: 'scale(1)',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.3)'
        }
      },
      {
        top: 0,
        left: `${value * 100}%`,
        marginTop: -3,
        marginLeft: -8
      },
      style
    )}
  />
);

// A composite progress bar component
const ProgressBar = ({
  isEnabled,
  direction = Direction.HORIZONTAL,
  value,
  ...props
}) => (
  <div className="song-sider-container">
    <FormattedTime numSeconds={props.position} />
    <Slider
      isEnabled={isEnabled}
      direction={direction}
      className="song-sider"
      style={{
        cursor: 'pointer'
      }}
      {...props}
    >
      <SliderBar
        className="position-sider"
        direction={direction}
        value={value}
      />
      <SliderHandle
        className="handler-sider"
        direction={direction}
        value={value}
      />
    </Slider>
    <FormattedTime numSeconds={props.duration || 0} />
  </div>
);

export default ProgressBar;
