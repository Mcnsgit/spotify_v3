import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setView, setModal } from '../utils/actions/uiActions';
import { fetchPlaylist } from '../utils/actions/playlistActions';
import { fetchArtist } from '../utils/actions/artistActions';
import { fetchAlbum } from '../utils/actions/albumActions';

export default function(ComposedComponent) {
  class UiHoc extends Component {
    showModal = () => {
      this.props.setModal(true, 'playlist');
    };
    onPlaylistClick = id => {
      this.props.fetchPlaylist(id);
      this.props.setView('playlist');
    };

    onArtistClick = id => {
      this.props.fetchArtist(id);
      this.props.setView('artist');
    };

    onAlbumClick = id => {
      this.props.fetchAlbum(id);
      this.props.setView('album');
    };

    onSearch = () => {
      this.props.setView('search');
    };

    render = () => (
      <ComposedComponent
        {...this.props}
        showModal={this.showModal}
        onPlaylistClick={this.onPlaylistClick}
        onArtistClick={this.onArtistClick}
        onAlbumClick={this.onAlbumClick}
        onSearch={this.onSearch}
      />
    );
  }

  const mapDispatchToProps = dispatch => {
    return bindActionCreators(
      {
        fetchPlaylist,
        fetchArtist,
        fetchAlbum,
        setView,
        setModal
      },
      dispatch
    );
  };

  return connect(
    null,
    mapDispatchToProps
  )(UiHoc);
}