  import React, { useState, useEffect, useContext } from 'react';
  import { BsSearch } from 'react-icons/bs';
  import { CgClose } from 'react-icons/cg';
  import TrackSearchResult from './TrackSearchResults';
  import "./TrackSearch.module.css";
  import { AppContext } from "../../../utils/AppContextProvider";
  import { actionTypes } from "../../../utils/AppState";
  import SpotifyWebApi from 'spotify-web-api-node';
  import { Container, Form } from 'react-bootstrap';

  const spotifyApi = new SpotifyWebApi({
    clientId: "1f42356ed83f46cc9ffd35c525fc8541",
  });

  export default function Searchbar({ accessToken }) {
    const { dispatch } = useContext(AppContext);
    const [search, setSearch] = useState("");
    const [playingTrack, setPlayingTrack] = useState();
    const [searchResults, setSearchResults] = useState([]);

    function handleSearch(track) {
      setPlayingTrack(track);
      setSearch(" ");
    }

    useEffect(() => {
      if (!playingTrack) return;
    }, [playingTrack]);

    useEffect(() => {
      if (!accessToken) return;
      spotifyApi.setAccessToken(accessToken);
    }, [accessToken]);

    useEffect(() => {
      if (!search) return setSearchResults([]);
      if (!accessToken) return;

      let cancel = false;
      spotifyApi.searchTracks(search).then(res => {
        if (cancel) return;
        setSearchResults(
          res.body.tracks.items.map(track => {
            const smallestAlbumImage = track.album.images.reduce(
              (smallest, image) => {
                if (image.height < smallest.height) return image;
                return smallest;
              },
              track.album.images[0]
            );
            return {
              artist: track.artists[0].name,
              title: track.name,
              uri: track.uri,
              albumUrl: smallestAlbumImage.url,
            };
          })
        );
      });

      return () => (cancel = true);
    }, [search, accessToken]);

    const clearInput = () => {
      setSearchResults([]);
      setSearch("");
    };

    const handleTrackSelect = (track) => {
      dispatch({ type: actionTypes.SET_CURRENT_TRACK, currentTrack: track });
      clearInput();
    };

    return (
      <Container className="d-flexflex-columnpy-2">
        <div className="search__bar" style={{ height: "100vh" }}>
          <Form.Control 
            id='searchInput'
            type="search"
            placeholder="Search for Songs, Artists, or Albums"
            className="searchInput"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="searchIcon">
            <BsSearch className="searchIcon" onClick={handleSearch} />
            <span className="m-2">Search</span>
            <CgClose className="closeIcon" onClick={clearInput} />
          </div>
        </div>
        <div className="TrackResults">
          {searchResults.map(track => (
            <TrackSearchResult
              track={track}
              key={track.uri}
              chooseTrack={handleTrackSelect}
            />
          ))}
          {searchResults.length === 0 && (
            <div className='noResults'>No results found</div>
          )}
        </div>
      </Container>
    );
  }