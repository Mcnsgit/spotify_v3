import serverApi from '../../axios';

export const setStatus = status => {
  return {
    type: 'FETCH_STATUS_SUCCESS',
    status
  };
};

export const nextSong = () => {
  serverApi.post('/me/player/next');
  return {
    type: 'CHANGE_SONG'
  };
};

export const previousSong = () => {
  serverApi.post('/me/player/previous');
  return {
    type: 'CHANGE_SONG'
  };
};

export const playSong = (context = false, offset) => {
  if (context && offset) {
    serverApi.put('/me/player/play', {
      context_uri: context,
      offset: { position: offset }
    });
  } else {
    if (context) {
      serverApi.put('/me/player/play', {
        context_uri: context
      });
    } else {
      serverApi.put('/me/player/play');
    }
  }
  return {
    type: 'PLAY_STATE'
  };
};

export const playTracks = (tracks, offset) => {
  serverApi.put('/me/player/play', {
    uris: tracks,
    offset: { position: offset }
  });
  return {
    type: 'PLAY_STATE'
  };
};

export const pauseSong = () => {
  serverApi.put('/me/player/pause');
  return {
    type: 'PAUSE_STATE'
  };
};

export const seekSong = ms => {
  serverApi.put(`/me/player/seek?position_ms=${ms}`);
  return {
    type: 'SEEK_SONG'
  };
};

export const repeatContext = status => {
  serverApi.put(`/me/player/repeat?state=${status}`);
  return {
    type: 'REPEAT'
  };
};

export const shuffle = status => {
  serverApi.put(`/me/player/shuffle?state=${status}`);
  return {
    type: 'Shuffle'
  };
};
