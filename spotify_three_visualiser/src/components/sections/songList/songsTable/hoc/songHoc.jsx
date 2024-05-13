import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  removeSong,
  addSong,
  containsSong
} from '../../../../../utils/actions/libraryActions';

function withSongsState(ComposedComponent) {
  class StatusHoc extends Component {
    state = {
      songsStatus: []
    };

    componentDidMount() {
      this.fetchStatus();
    }

    componentDidUpdate(prevProps) {
      if (this.props.songs !== prevProps.songs) {
        this.fetchStatus();
      }
    }

    async fetchStatus() {
      const {songsStatus} = this.state;
      const songs = this.props.songs
        .slice(songsStatus.length)
        .map(s => (s.track ? s.track.id : s.id));
      

      
      for (let i = 0; i < songs.length; i += 25) {
        const  temparray = songs.slice(i, i + 25);
        try{
          const response =  await this.props.containsSong(temparray.join(','));
          this.setSongs(response);
        } catch(error){
          console.error('Error fetching song status:', error);
        }
      }
    }

    setSongs(songs) {
      this.setState(prevState => ({
        songsStatus:[prevState.songsStatus, ...songs]
      }));
    }

    changeSongStatus = (index, newState) => {
      const {songsStatus} = this.state;
      songsStatus[index] = newState;
      this.setState({ songsStatus });
    };

    render () {
      return (
      <ComposedComponent
        changeSongStatus={this.changeSongStatus}
        songsStatus={this.state.songsStatus}
        {...this.props}
      />
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    removeSong,
    containsSong,
    addSong
  }, dispatch);
};

return connect(null, mapDispatchToProps)(StatusHoc);
}

export default withSongsState;