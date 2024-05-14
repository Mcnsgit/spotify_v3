import {serverApi} from '../../axios';

const fetchArtistPending = () => {
  return {
    type: 'FETCH_ARTIST_PENDING'
  };
};

const fetchArtistSuccess = artist => {
  return {
    type: 'FETCH_ARTIST_SUCCESS',
    artist
  };
};

const fetchArtistError = () => {
  return {
    type: 'FETCH_ARTIST_ERROR'
  };
};

const dispacher = a => {
  return a;
};

export const followArtist = () => {
  return async (dispatch, getState) => {
    const id = getState().artistReducer.currentArtist.id;
    serverApi.put(`/me/following?type=artist&ids=${id}`);
    dispatch(
      dispacher({
        type: 'FOLLOW_ARTIST'
      })
    );
  };
};

export const unfollowArtist = () => {
  return async (dispatch, getState) => {
    const id = getState().artistReducer.currentArtist.id;
    serverApi.delete(`/me/following?type=artist&ids=${id}`);
    dispatch(
      dispacher({
        type: 'UNFOLLOW_ARTIST'
      })
    );
  };
};

export const fetchArtist = id => {
  return async dispatch => {
    dispatch(fetchArtistPending());
    try {
      const follow = await serverApi.get(
        `/me/following/contains?type=artist&ids=${id}`
      );
      const artist = await serverApi.get(`/artists/${id}`);
      const result = {
        ...artist.data,
        follows: follow.data[0]
      };
      dispatch(fetchArtistPopular(id));
      dispatch(fetchArtistAlbums(id));
      dispatch(fetchArtistSuccess(result));
    } catch (error) {
      dispatch(fetchArtistError());
      return error;
    }
  };
};

export const fetchArtistAlbums = id => {
  return async dispatch => {
    try {
      const albums = await serverApi.get(`/artists/${id}/albums`);
      const result = {
        albums: albums.data.items.filter(i => i.album_type === 'album'),
        singles: albums.data.items.filter(i => i.album_type === 'single')
      };
      dispatch(fetchAlbumsSuccess(result));
    } catch (error) {
      return error;
    }
  };
};

const fetchAlbumsSuccess = albums => {
  return {
    type: 'FETCH_ALBUMS_SUCCESS',
    albums
  };
};

export const fetchArtistPopular = id => {
  return async (dispatch, getState) => {
    try {
      const country = getState().userReducer.user.country;
      const popular = await serverApi.get(
        `/artists/${id}/top-tracks?country=${country}`
      );
      const relatedArtist = await serverApi.get(`/artists/${id}/related-artists`);
      dispatch(
        fetchPopularSuccess({
          popularTracks: popular.data.tracks,
          relatedArtists: relatedArtist.data.artists
        })
      );
    } catch (error) {
      return error;
    }
  };
};

const fetchPopularSuccess = popular => {
  return {
    type: 'FETCH_POPULAR_SUCCESS',
    popular
  };
};
export const fetchArtistsPending = () => {
  return {
    type: 'FETCH_ARTISTS_PENDING'
  };
};

export const fetchArtistsSuccess = (artists) => {
  return {
    type: 'FETCH_ARTISTS_SUCCESS',
    artists
  };
};

export const fetchArtistsError = () => {
  return {
    type: 'FETCH_ARTISTS_ERROR'
  };
};

export const fetchArtists = (accessToken, artistIds) => {
  return dispatch => {
    const request = new Request(`https://api.spotify.com/v1/artists?ids=${artistIds}`, {
      headers: new Headers({
        'Authorization': 'Bearer ' + accessToken
      })
    });

    dispatch(fetchArtistsPending());

    fetch(request).then(res => {
      return res.json();
    }).then(res => {
      dispatch(fetchArtistsSuccess(res));
    }).catch(err => {
      dispatch(fetchArtistsError(err));
    });
  };
};


export const fetchArtistSongsPending = () => {
  return {
    type: 'FETCH_ARTIST_SONGS_PENDING'
  };
};

export const fetchArtistSongsSuccess = (songs) => {
  return {
    type: 'FETCH_ARTIST_SONGS_SUCCESS',
    songs
  };
};

export const fetchArtistSongsError = () => {
  return {
    type: 'FETCH_ARTIST_SONGS_ERROR'
  };
};

export const fetchArtistSongs = (artistId, accessToken) => {
  return dispatch => {
    const request = new Request(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=US`, {
      headers: new Headers({
        'Authorization': 'Bearer ' + accessToken
      })
    });

    dispatch(fetchArtistSongsPending());

    fetch(request).then(res => {
      if(res.statusText === "Unauthorized") {
        window.location.href = './';
      }
      return res.json();
    }).then(res => {
      // map the response to match that returned from get song request
      res.items = res.tracks.map(item => {
        return {
          track: item
        };
      });

      dispatch(fetchArtistSongsSuccess(res.items));
    }).catch(err => {
      dispatch(fetchArtistSongsError(err));
    });
  };
};


export const setArtistIds = (artistIds) => {
  return {
    type: 'SET_ARTIST_IDS',
    artistIds
  };
};
