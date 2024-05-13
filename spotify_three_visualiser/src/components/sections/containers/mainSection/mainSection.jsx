import React, { Component } from 'react';

import { connect } from 'react-redux';

import Header from '../../../header/Header';
import MusicPlayer from '../../../visualMusicContainer/MusicPlayer';
import Browse from '../../components/sections/browse/browser';
import Songs from '../../songList/songList';
import Playlist from '../../playlists/playlist';
// import Artist from '../../artist/artist';
// import Album from '../../album/album';
// import Search from '../../components/sections/search/search';
// import Albums from '../../components/sections/top/albums';
// import Artists from '../../components/sections/top/artists';
import Modal from '../../playlists/modal';

import profile from '../../../../images/profile.png';
import './mainSection.scss';

class MainSection extends Component {
  render = () => {
    let name = this.props.user.display_name;
    let id = this.props.user.id;

    let img = this.props.user.images[0]
      ? this.props.user.images[0].url
      : profile;

    return (
      <div className="main-section">
        <Header username={name || id} img={img} />
        <Modal />
        <div className="main-section-container">
          {this.props.view === 'browse' ? <Browse /> : null}
          {this.props.view === 'playlist' ? <Playlist /> : null}
          {this.props.view === 'recently' ? <Songs recently /> : null}
          {this.props.view === 'songs' ? <Songs /> : null}
        </div>
        <MusicPlayer />
      </div>
    );
  };
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.user,
    view: state.uiReducer.view
  };
};

export default connect(mapStateToProps)(MainSection);

// {this.props.view === 'artist' ? <Artist /> : null}
// {this.props.view === 'album' ? <Album /> : null}
// {this.props.view === 'search' ? <Search /> : null}
// {this.props.view === 'albums' ? <Albums /> : null}
// {this.props.view === 'artists' ? <Artists /> : null}