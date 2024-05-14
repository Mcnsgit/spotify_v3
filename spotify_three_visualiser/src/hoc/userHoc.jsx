import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { followArtist, unfollowArtist } from '../utils/actions/artistActions';
import {
  followPlaylist,
  unfollowPlaylist
} from '../utils/actions/playlistActions';

export default function(ComposedComponent) {
  class UserHoc extends Component {
    render = () => <ComposedComponent {...this.props} />;
  }

  const mapDispatchToProps = dispatch => {
    return bindActionCreators(
      { followArtist, unfollowArtist, followPlaylist, unfollowPlaylist },
      dispatch
    );
  };

  return connect(
    null,
    mapDispatchToProps
  )(UserHoc);
}
