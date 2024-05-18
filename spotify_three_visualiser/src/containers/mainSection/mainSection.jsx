// import Albums from '../../components/sections/top/albums';
// import Artists from '../../components/sections/top/artists';
// import Browse from '../../components/sections/browse/browser';
// import Artist from '../../components/sections/artist/artist';
// import Album from '../../components/sections/album/album';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../../components/header/header';

import './mainSection.css';
import Songs from '../../components/sections/songList/songList';
import Playlist from '../../components/sections/playlist/playlist';
import Search from '../../components/sections/search/search';
import Modal from '../../components/playlistModal/modal';
import defaultProfile from './images/profile.png';

const MainSection = ({ user, view }) => {
  const name = user?.display_name || 'Default Name';
  const img = user?.images?.[0]?.url || defaultProfile;

  const components = {
    // browse: <Browse />,
    playlist: <Playlist />,
    recently: <Songs recently />,
    songs: <Songs />,
    // artist: <Artist />,
    // album: <Album />,
    search: <Search />,
    // albums: <Albums />,
    // artists: <Artists />
  };

  return (
    <div className="main-section">
      <Header username={name} img={img} />
      <Modal />
      <div className="main-section-container">
        {components[view]}
      </div>

    </div>
  );
};

const mapStateToProps = state => ({
  user: state.userReducer.user,
  view: state.uiReducer.view
});

export default connect(mapStateToProps)(MainSection);
