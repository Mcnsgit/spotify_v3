var redirect_uri = "http://localhost:3001"; // change this your value
//var redirect_uri = "http://127.0.0.1:5500/index.html";
 

var client_id = "1f42356ed83f46cc9ffd35c525fc8541"; 
var client_secret = "487ec052888b4917b00665fc65b8df9f"; // In a real app you should not expose your client_secret to the user

var access_token = null;
var refresh_token = null;
var currentPlaylist = "";
var radioButtons = [];

const AUTHORIZE = "https://accounts.spotify.com/authorize"
const TOKEN = "https://accounts.spotify.com/api/token";
const PLAYLISTS = "https://api.spotify.com/v1/me/playlists";
const DEVICES = "https://api.spotify.com/v1/me/player/devices";
const PLAY = "https://api.spotify.com/v1/me/player/play";
const PAUSE = "https://api.spotify.com/v1/me/player/pause";
const NEXT = "https://api.spotify.com/v1/me/player/next";
const PREVIOUS = "https://api.spotify.com/v1/me/player/previous";
const PLAYER = "https://api.spotify.com/v1/me/player";
const TRACKS = "https://api.spotify.com/v1/playlists/{{PlaylistId}}/tracks";
const CURRENTLYPLAYING = "https://api.spotify.com/v1/me/player/currently-playing";
const SHUFFLE = "https://api.spotify.com/v1/me/player/shuffle";
const VolumeControl = "https://api.spotify.com/v1/me/player/volume";
export function onPageLoad(){
    client_id = localStorage.getItem("client_id");
    client_secret = localStorage.getItem("client_secret");
    if ( window.location.search.length > 0 ){
        handleRedirect();
    }
    else{
        access_token = localStorage.getItem("access_token");
        if ( access_token == null ){
            // we don't have an access token so present token section
            document.getElementById("tokenSection").style.display = 'block';  
        }
        else {
            // we have an access token so present device section
            document.getElementById("deviceSection").style.display = 'block';  
            refreshDevices();
            refreshPlaylists();
            currentlyPlaying();
        }
    }
    refreshRadioButtons();
}

export function handleRedirect(){
    let code = getCode();
    fetchAccessToken( code );
    window.history.pushState("", "", redirect_uri); // remove param from url
}

export function getCode(){
    let code = null;
    const queryString = window.location.search;
    if ( queryString.length > 0 ){
        const urlParams = new URLSearchParams(queryString);
        code = urlParams.get('code')
    }
    return code;
}

export function requestAuthorization(){
    client_id = document.getElementById("clientId").value;
    client_secret = document.getElementById("clientSecret").value;
    localStorage.setItem("client_id", client_id);
    localStorage.setItem("client_secret", client_secret); // In a real app you should not expose your client_secret to the user

    let url = AUTHORIZE;
    url += "?client_id=" + client_id;
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURI(redirect_uri);
    url += "&show_dialog=true";
    url += "&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private";
    window.location.href = url; // Show Spotify's authorization screen
}

export function fetchAccessToken( code ){
    let body = "grant_type=authorization_code";
    body += "&code=" + code; 
    body += "&redirect_uri=" + encodeURI(redirect_uri);
    body += "&client_id=" + client_id;
    body += "&client_secret=" + client_secret;
    callAuthorizationApi(body);
}

export function refreshAccessToken(){
    refresh_token = localStorage.getItem("refresh_token");
    let body = "grant_type=refresh_token";
    body += "&refresh_token=" + refresh_token;
    body += "&client_id=" + client_id;
    callAuthorizationApi(body);
}

export function callAuthorizationApi(body){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", TOKEN, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', 'Basic ' + btoa(client_id + ":" + client_secret));
    xhr.send(body);
    xhr.onload = handleAuthorizationResponse;
}

export function handleAuthorizationResponse(){
    if ( this.status === 200 ){
        var data = JSON.parse(this.responseText);
        console.log(data);
       if ( data.access_token !== undefined ){
            access_token = data.access_token;
            localStorage.setItem("access_token", access_token);
        }
        if ( data.refresh_token  !== undefined ){
            refresh_token = data.refresh_token;
            localStorage.setItem("refresh_token", refresh_token);
        }
        onPageLoad();
    }
    else {
        console.log(this.responseText);
        alert(this.responseText);
    }
}

export function refreshDevices(){
    callApi( "GET", DEVICES, null, handleDevicesResponse );
}

export function handleDevicesResponse(){
    if ( this.status === 200 ){
        var data = JSON.parse(this.responseText);
        console.log(data);
        removeAllItems( "devices" );
        data.devices.forEach(item => addDevice(item));
    }
    else if ( this.status === 401 ){
        refreshAccessToken()
    }
    else {
        console.log(this.responseText);
        alert(this.responseText);
    }
}

export function addDevice(item){
    let node = document.createElement("option");
    node.value = item.id;
    node.innerHTML = item.name;
    document.getElementById("devices").appendChild(node); 
}

export function callApi(method, url, body, callback){
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
    xhr.send(body);
    xhr.onload = callback;
}

export function refreshPlaylists(){
    callApi( "GET", PLAYLISTS, null, handlePlaylistsResponse );
}

export function handlePlaylistsResponse(){
    if ( this.status === 200 ){
        var data = JSON.parse(this.responseText);
        console.log(data);
        removeAllItems( "playlists" );
        data.items.forEach(item => addPlaylist(item));
        document.getElementById('playlists').value=currentPlaylist;
    }
    else if ( this.status === 401 ){
        refreshAccessToken()
    }
    else {
        console.log(this.responseText);
        alert(this.responseText);
    }
}

export function addPlaylist(item){
    let node = document.createElement("option");
    node.value = item.id;
    node.innerHTML = item.name + " (" + item.tracks.total + ")";
    document.getElementById("playlists").appendChild(node); 
}

export function removeAllItems( elementId ){
    let node = document.getElementById(elementId);
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}

export function play(){
    let playlist_id = document.getElementById("playlists").value;
    let trackindex = document.getElementById("tracks").value;
    let album = document.getElementById("album").value;
    let body = {};
    if ( album.length > 0 ){
        body.context_uri = album;
    }
    else{
        body.context_uri = "spotify:playlist:" + playlist_id;
    }
    body.offset = {};
    body.offset.position = trackindex.length > 0 ? Number(trackindex) : 0;
    body.offset.position_ms = 0;
    callApi( "PUT", PLAY + "?device_id=" + deviceId(), JSON.stringify(body), handleApiResponse );
}

export function shuffle(){
    callApi( "PUT", SHUFFLE + "?state=true&device_id=" + deviceId(), null, handleApiResponse );
    play(); 
}
export function currentlyPlaying(){
    callApi( "GET", CURRENTLYPLAYING, null, handleCurrentlyPlayingResponse );
}

export function pause(){
    callApi( "PUT", PAUSE + "?device_id=" + deviceId(), null, handleApiResponse );
}

export function next(){
    callApi( "POST", NEXT + "?device_id=" + deviceId(), null, handleApiResponse );
}

export function previous(){
    callApi( "POST", PREVIOUS + "?device_id=" + deviceId(), null, handleApiResponse );
}

export function volume_percent(){
    let vol = document.getElementById("volume").value;
    callApi( "PUT", VolumeControl + "?volume_percent=" + vol + "&device_id=" + deviceId(), null, handleApiResponse );
}
export function transfer(){
    let body = {};
    body.device_ids = [];
    body.device_ids.push(deviceId())
    callApi( "PUT", PLAYER, JSON.stringify(body), handleApiResponse );
}

export function handleApiResponse(){
    if ( this.status === 200){
        console.log(this.responseText);
        setTimeout(currentlyPlaying, 2000);
    }
    else if ( this.status === 204 ){
        setTimeout(currentlyPlaying, 2000);
    }
    else if ( this.status ===401 ){
        refreshAccessToken()
    }
    else {
        console.log(this.responseText);
        alert(this.responseText);
    }    
}

export function deviceId(){
    return document.getElementById("devices").value;
}

export function fetchTracks(){
    let url = "";
    let playlist_id = document.getElementById("playlists").value;
    if ( playlist_id.length > 0 ){
        url = TRACKS.replace("{{PlaylistId}}", playlist_id);
        callApi( "GET", url, null, handleTracksResponse );
    }
}

export function handleTracksResponse(){
    if ( this.status === 200 ){
        var data = JSON.parse(this.responseText);
        console.log(data);
        removeAllItems( "tracks" );
        data.items.forEach( (item, index) => addTrack(item, index));
    }
    else if ( this.status === 401 ){
        refreshAccessToken()
    }
    else {
        console.log(this.responseText);
        alert(this.responseText);
    }
}

export function addTrack(item, index){
    let node = document.createElement("option");
    node.value = index;
    node.innerHTML = item.track.name + " (" + item.track.artists[0].name + ")";
    document.getElementById("tracks").appendChild(node); 
}

// export function currentlyPlaying(){
//     callApi( "GET", PLAYER + "?market=US", null, handleCurrentlyPlayingResponse );
// }

export function handleCurrentlyPlayingResponse(){
    if ( this.status === 200 ){
        var data = JSON.parse(this.responseText);
        console.log(data);
        if ( data.item != null ){
            document.getElementById("albumImage").src = data.item.album.images[0].url;
            document.getElementById("trackTitle").innerHTML = data.item.name;
            document.getElementById("trackArtist").innerHTML = data.item.artists[0].name;
        }


        if ( data.device != null ){
            document.getElementById("deviceImage").src = data.device.images[0].url;
            document.getElementById("deviceName").innerHTML = data.device.name;
            let currentDevice = document.getElementById("devices").value;
            // select device
            currentDevice = data.device.id;
            document.getElementById('devices').value=currentDevice;
        }

        if ( data.context != null ){
            // select playlist
            currentPlaylist = data.context.uri;
            currentPlaylist = currentPlaylist.substring( currentPlaylist.lastIndexOf(":") + 1,  currentPlaylist.length );
            document.getElementById('playlists').value=currentPlaylist;
        }
    }
    else if ( this.status === 204 ){

    }
    else if ( this.status === 401 ){
        refreshAccessToken()
    }
    else {
        console.log(this.responseText);
        alert(this.responseText);
    }
}

export function saveNewRadioButton(){
    let item = {};
    item.deviceId = deviceId();
    item.playlistId = document.getElementById("playlists").value;
    radioButtons.push(item);
    localStorage.setItem("radio_button", JSON.stringify(radioButtons));
    refreshRadioButtons();
}

export function refreshRadioButtons(){
    let data = localStorage.getItem("radio_button");
    if ( data != null){
        radioButtons = JSON.parse(data);
        if ( Array.isArray(radioButtons) ){
            removeAllItems("radioButtons");
            radioButtons.forEach( (item, index) => addRadioButton(item, index));
        }
    }
}

export function onRadioButton( deviceId, playlistId ){
    let body = {};
    body.context_uri = "spotify:playlist:" + playlistId;
    body.offset = {};
    body.offset.position = 0;
    body.offset.position_ms = 0;
    callApi( "PUT", PLAY + "?device_id=" + deviceId, JSON.stringify(body), handleApiResponse );
    //callApi( "PUT", SHUFFLE + "?state=true&device_id=" + deviceId, null, handleApiResponse );
}

export function addRadioButton(item, index){
    let node = document.createElement("button");
    node.className = "btn btn-primary m-2";
    node.innerText = index;
    node.onclick = function() { onRadioButton( item.deviceId, item.playlistId ) };
    document.getElementById("radioButtons").appendChild(node);
}
// import React, { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import Dashboard from "./Dashboard";
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import { fetchUser } from '../utils/actions/userActions';
// import { accessToken } from '../utils/actions/sessionActions';
// import {
//   playSong,
//   playTracks,
//   pauseSong,
//   nextSong,
//   previousSong,
// } from '../utils/actions/playerActions';

// const Spotify = ({ code, setToken: dispatchSetToken, fetchUser: dispatchFetchUser, playSong: dispatchPlaySong, stopSong: dispatchStopSong, pauseSong: dispatchPauseSong, resumeSong: dispatchResumeSong }) => {
//   const [accessToken, setAccessToken] = useState();
//   const [refreshToken, setRefreshToken] = useState();
//   const [expiresAt, setExpiresAt] = useState(0);

//   const fetchAccessToken = useCallback(async () => {
//     if (Date.now() < expiresAt) return; // Avoid unnecessary token refresh
//     try {
//       const response = await axios.post("http://localhost:8080/auth/refresh", { refresh_token: refreshToken });
//       const { accessToken, expiresIn } = response.data;
//       setAccessToken(accessToken);
//       setExpiresAt(Date.now() + expiresIn * 1000);
//     } catch (error) {
//       console.error("Failed to fetch access token:", error);
//       window.location = "/";
//     }
//   }, [refreshToken, expiresAt]);

//   useEffect(() => {
//     let hashParams = {};
//     let e,
//       r = /([^&;=]+)=?([^&;]*)/g,
//       q = window.location.hash.substring(1);
//     while ((e = r.exec(q))) {
//       hashParams[e[1]] = decodeURIComponent(e[2]);
//     }

//     if (!hashParams.access_token) {
//       window.location.href =
//         'https://accounts.spotify.com/authorize?client_id=230be2f46909426b8b80cac36446b52a&scope=playlist-read-private%20playlist-read-collaborative%20playlist-modify-public%20user-read-recently-played%20playlist-modify-private%20ugc-image-upload%20user-follow-modify%20user-follow-read%20user-library-read%20user-library-modify%20user-read-private%20user-read-email%20user-top-read%20user-read-playback-state&response_type=token&redirect_uri=http://localhost:3000/callback';
//     } else {
//       dispatchSetToken(hashParams.access_token);
//       setAccessToken(hashParams.access_token);
//       setRefreshToken(hashParams.refresh_token);
//       setExpiresAt(Date.now() + hashParams.expires_in * 1000);
//       window.history.pushState({}, null, "/dashboard");
//     }
//   }, [dispatchSetToken]);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       fetchAccessToken();
//     }, 60000);
//     return () => clearInterval(timer);
//   }, [fetchAccessToken]);

//   useEffect(() => {
//     if (accessToken) {
//       dispatchFetchUser(accessToken);
//     }
//   }, [accessToken, dispatchFetchUser]);

//   return <Dashboard code={code} accessToken={accessToken} />;
// };

// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators(
//     {
//       fetchUser,
//       accessToken,
//       nextSong,
//       playSong,
//       playTracks,
//       pauseSong,
//       previousSong,
//     },
//     dispatch
//   );
// };

// export default connect(null, mapDispatchToProps)(Spotify);
// import { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import Dashboard from "./Dashboard";
// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import { fetchUser } from '../utils/actions/userActions';
// import { setToken } from '../utils/actions/tokenActions';
// import {
//   playSong,
//   stopSong,
//   pauseSong,
//   resumeSong,
// } from '../utils/actions/songActions';


// class Spotify extends Component {
//   static audio;

//   componentDidMount() {
//     let hashParams = {};
//     let e,
//       r = /([^&;=]+)=?([^&;]*)/g,
//       q = window.location.hash.substring(1);
//     while ((e = r.exec(q))) {
//       hashParams[e[1]] = decodeURIComponent(e[2]);
//     }

//     if (!hashParams.access_token) {
//       window.location.href =
//         'https://accounts.spotify.com/authorize?client_id=230be2f46909426b8b80cac36446b52a&scope=playlist-read-private%20playlist-read-collaborative%20playlist-modify-public%20user-read-recently-played%20playlist-modify-private%20ugc-image-upload%20user-follow-modify%20user-follow-read%20user-library-read%20user-library-modify%20user-read-private%20user-read-email%20user-top-read%20user-read-playback-state&response_type=token&redirect_uri=http://localhost:3000/callback';
//     } else {
//       this.props.setToken(hashParams.access_token);
//     }
//   }

//   componentWillReceiveProps(nextProps) {
//     if (nextProps.token) {
//       this.props.fetchUser(nextProps.token);
//     }

//     if (this.audio !== undefined) {
//       this.audio.volume = nextProps.volume / 100;
//     }
//   }

//   }

// export default export function Spotify(code) {
//   const [accessToken, setAccessToken] = useState();
//   const [refreshToken, setRefreshToken] = useState();
//   const [expiresAt, setExpiresAt] = useState(0);

//   const fetchAccessToken = useCallback(async () => {
//     if (Date.now() < expiresAt) return;  // Avoid unnecessary token refresh
//     try {
//       const response = await axios.post("http://localhost:8080/auth/refresh", { refresh_token: refreshToken });
//       const { accessToken, expiresIn } = response.data;
//       setAccessToken(accessToken);
//       setExpiresAt(Date.now() + expiresIn * 1000);
//     } catch (error) {
//       console.error("Failed to fetch access token:", error);
//       window.location = "/";
//     }
//   }, [refreshToken, expiresAt]);

//   useEffect(() => {
//     const params = new URLSearchParams(window.location.hash.substring(1));
//     const accessToken = params.get("access_token");
//     const refreshToken = params.get("refresh_token");
//     const expiresIn = params.get("expires_in");
//     if (accessToken && refreshToken && expiresIn) {
//       setAccessToken(accessToken);
//       setRefreshToken(refreshToken);
//       setExpiresAt(Date.now() + expiresIn * 1000);
//       window.history.pushState({}, null, "/dashboard");
//     }
//   }, []);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       fetchAccessToken();
//     }, 60000);
//     return () => clearInterval(timer);
//   }, [fetchAccessToken]);

//   return <Dashboard code={code} accessToken={accessToken} />;
// }


// const spotifyApi = axios.create({
//   baseURL: 'https://api.spotify.com/v1',
//   headers: {
//     'Content-Type': 'application/json',
//   }
// });

// const setAuthToken = (token) => {
//   spotifyApi.defaults.headers['Authorization'] = `Bearer ${token}`;
// };

// const getTrackDetails = async (trackId, token) => {
//   setAuthToken(token);
//   try {
//     const response = await spotifyApi.get(`/tracks/${trackId}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching track details:', error);
//     return null;
//   }
// };

// const getTrackAudioFeatures = async (trackId, token) => {
//   setAuthToken(token);
//   try {
//     const response = await spotifyApi.get(`/audio-features/${trackId}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching track audio features:', error);
//     return null;
//   }
// };

// const getTrackAudioAnalysis = async (trackId, token) => {
//   setAuthToken(token);
//   try {
//     const response = await spotifyApi.get(`/audio-analysis/${trackId}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching track audio analysis:', error);
//     return null;
//   }
// };

// const getPlaylistData = async (playlistId, token) => {
//   setAuthToken(token);
//   try {
//     const response = await spotifyApi.get(`/playlists/${playlistId}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching playlist data:', error);
//     return null;
//   } 
// };


// const playTrack = async (device_id, context_uri, uris, offset, position_ms, token) => {
//   setAuthToken(token);
//   const body = {
//     context_uri,
//     uris,
//     offset,
//     position_ms
//   };
//   try {
//     await spotifyApi.put(`/me/player/play?device_id=${device_id}`, body);
//   } catch (error) {
//     console.error('Error playing track:', error);
//   }
// };

// const pausePlayback = async (device_id, token) => {
//   setAuthToken(token);
//   try {
//     await spotifyApi.put(`/me/player/pause?device_id=${device_id}`);
//   } catch (error) {
//     console.error('Error pausing playback:', error);
//   }
// };

// const setVolume = async (volume_percent, device_id, token) => {
//   setAuthToken(token);
//   try {
//     await spotifyApi.put(`/me/player/volume?volume_percent=${volume_percent}&device_id=${device_id}`);
//   } catch (error) {
//     console.error('Error setting volume:', error);
//   }
// };

// const skipToNext = async (device_id, token) => {
//   setAuthToken(token);
//   try {
//     await spotifyApi.post(`/me/player/next?device_id=${device_id}`);
//   } catch (error) {
//     console.error('Error skipping to next track:', error);
//   }
// };

// const skipToPrevious = async (device_id, token) => {
//   setAuthToken(token);
//   try {
//     await spotifyApi.post(`/me/player/previous?device_id=${device_id}`);
//   } catch (error) {
//     console.error('Error skipping to previous track:', error);
//   }
// };

// const getPlaybackState = async (device_id, token) => {
//   setAuthToken(token);
//   try {
//     const response = await spotifyApi.get(`/me/player?device_id=${device_id}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching playback state:', error);
//     return null;
//   }
// };

// const searchTrack = async (query, token) => {
//   setAuthToken(token);
//   try { const response = await spotifyApi.get('/search?q=&remaster%2520track%3ADoxy%2520artist%3AMiles%2520Davis&type=album%2Cplaylist%2Ctrack%2Cartist&market=GB&limit=50');
//   return response.data;
// } catch (error) {
//   console.error('Error searching track:', error);
//   return null;
// }
// }
// export { getTrackDetails, getTrackAudioFeatures , getTrackAudioAnalysis, playTrack, pausePlayback, setVolume, skipToNext, skipToPrevious, setAuthToken, getPlaybackState, searchTrack, getPlaylistData };