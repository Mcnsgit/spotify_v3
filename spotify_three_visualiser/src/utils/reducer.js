import { reducerCases } from "./Constnts";

export const initialState = {
  token: null,
  playlists: [],
  userInfo: null,
  selectedPlaylistId: null,
  selectedPlaylist: null,
  playerState: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case reducerCases.SET_TOKEN: {
      return {
        ...state,
        token: action.token,
      };
    }
    case reducerCases.SET_PLAYLISTS: {
      return {
        ...state,
        playlists: action.playlists,
      };
    }
    case reducerCases.SET_USER: {
      return {
        ...state,
        userInfo: action.userInfo,
      };
    }
    case reducerCases.SET_PLAYLIST: {
      return {
        ...state,
        selectedPlaylist: action.selectedPlaylist,
      };
    }
    case reducerCases.SET_PLAYING: {
      return {
        ...state,
        currentlyPlaying: action.currentlyPlaying,
      };
    }
    case reducerCases.SET_PLAYER_STATE: {
      return {
        ...state,
        playerState: action.playerState,
      };
    }
    case reducerCases.SET_PLAYLIST_ID: {
      return {
        ...state,
        selectedPlaylistId: action.selectedPlaylistId,
      };
    }
    case reducerCases.SET_SEARCH_RESULT: {
      return {
        ...state,
        searchResult: action.searchResult,
      };
    }
    case reducerCases.SET_USER_PLAYLISTS: {
      return {
        ...state,
        userPlaylists: action.userPlaylists,
      };
    }
    case reducerCases.SET_USER_INFO: {
      return {
        ...state,
        userInfo: action.userInfo,
      };
    }
    case reducerCases.SET_RECENTLY_PLAYED: {
      return {
        ...state,
        recentlyPlayed: action.recentlyPlayed,
      };
    }
    case reducerCases.SET_ACCESS_TOKEN: {
      return {
        ...state,
        accessToken: action.accessToken,
      };
    }
    case reducerCases.SET_REFRESH_TOKEN: {
      return {
        ...state,
        refreshToken: action.refreshToken,
      };
    }
    default:
      return state;
  }
};

export default reducer;