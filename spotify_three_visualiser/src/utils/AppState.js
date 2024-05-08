export const initialState = {
    token: null,
    user: null,
    playlists: [],
    currentTrack: null,
    isPlaying: false,
    volume: 0.5,
    player: null,
    error: null,
    playerState: false,
    selectedPlaylistId: null,
    searchResult: null,
    userPlaylists: null,
    userInfo: null,
    recentlyPlayed: null,
    accessToken: null,
    refreshToken: null,
    audioAnalyserOptions: null,
    visualizerOptions: null,
    visualizer: null,
    playerTracks: null,
    playerCurrentTrack: null,
    playerProgress: null,
    playerVolume: null,
    search: null,

    

};

export const actionTypes = {
    SET_TOKEN: "SET_TOKEN",
    SET_PLAYLISTS: "SET_PLAYLISTS",
    SET_USER: "SET_USER",
    SET_PLAYLIST: "SET_PLAYLIST",
    SET_PLAYING: "SET_PLAYING",
    SET_PLAYER_STATE: "SET_PLAYER_STATE",
    SET_PLAYLIST_ID: "SET_PLAYLIST_ID",
    SET_SEARCH_RESULT: "SET_SEARCH_RESULT",
    SET_USER_PLAYLISTS: "SET_USER_PLAYLISTS",
    SET_USER_INFO: "SET_USER_INFO",
    SET_RECENTLY_PLAYED: "SET_RECENTLY_PLAYED",
    SET_ACCESS_TOKEN: "SET_ACCESS_TOKEN",
    SET_REFRESH_TOKEN: "SET_REFRESH_TOKEN",
    AUDIO_ANALYSER_OPTIONS: "audio-analyser-options",
    VISUALIZER_OPTIONS: "visualizer-options",
    SET_VISUALIZER: "SET_VISUALIZER",
    SET_PLAYER_TRACKS: "SET_PLAYER_TRACKS",
    SET_CURRENT_TRACK: "SET_CURRENT_TRACK",
    SET_PLAYER_PROGRESS: "SET_PLAYER_PROGRESS",
    SET_PLAYER_VOLUME: "SET_PLAYER_VOLUME",
    SET_SEARCH: "SET_SEARCH",
    SET_USER_FOLLOWED_ARTISTS: "SET_USER_FOLLOWED_ARTISTS",
    SET_SEARCH_RESULTS: "SET_SEARCH_RESULTS",
};

export const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_TOKEN:
            return { ...state, token: action.token };
        case actionTypes.SET_USER:
            return { ...state, user: action.user };
        case actionTypes.SET_PLAYLISTS:
            return { ...state, playlists: action.playlists };
        case actionTypes.SET_CURRENT_TRACK:
            return { ...state, currentTrack: action.track };
        case actionTypes.SET_PLAYING:
            return { ...state, isPlaying: action.isPlaying };
        case actionTypes.SET_VOLUME:
            return { ...state, volume: action.volume };
        case actionTypes.SET_PLAYER:
            return { ...state, player: action.player };
        case actionTypes.SET_ERROR:
            return { ...state, error: action.error };
        case actionTypes.SET_PLAYER_STATE:
            return { ...state, playerState: action.playerState };
        case actionTypes.SET_PLAYLIST_ID:
            return { ...state, selectedPlaylistId: action.selectedPlaylistId };
        case actionTypes.SET_SEARCH_RESULT:
            return { ...state, searchResult: action.searchResult };
        case actionTypes.SET_USER_PLAYLISTS:
            return { ...state, userPlaylists: action.userPlaylists };
        case actionTypes.SET_USER_INFO:
            return { ...state, userInfo: action.userInfo };
        case actionTypes.SET_RECENTLY_PLAYED:
            return { ...state, recentlyPlayed: action.recentlyPlayed };
        case actionTypes.SET_ACCESS_TOKEN:
            return { ...state, accessToken: action.accessToken };
        case actionTypes.SET_REFRESH_TOKEN:
            return { ...state, refreshToken: action.refreshToken };
        case actionTypes.AUDIO_ANALYSER_OPTIONS:
            return { ...state, audioAnalyserOptions: action.audioAnalyserOptions };
        case actionTypes.VISUALIZER_OPTIONS:
            return { ...state, visualizerOptions: action.visualizerOptions };
        case actionTypes.SET_VISUALIZER:
            return { ...state, visualizer: action.visualizer };
        case actionTypes.SET_PLAYER_TRACKS:
            return { ...state, playerTracks: action.playerTracks };
        case actionTypes.SET_PLAYER_PROGRESS:
            return { ...state, playerProgress: action.playerProgress };
        case actionTypes.SET_PLAYER_VOLUME:
            return { ...state, playerVolume: action.playerVolume };
        case actionTypes.SET_SEARCH:
            return { ...state, search: action.search };
        default:
            return state;
    }
};
