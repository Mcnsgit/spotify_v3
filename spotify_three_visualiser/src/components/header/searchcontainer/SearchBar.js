import React, { useState, useEffect } from 'react';
import { BsSearch } from 'react-icons/bs';
import { CgClose } from 'react-icons/cg';
import TrackSearchResult from './TrackSearchResults';
import "./TrackSearch.module.css";
import { useStateProvider } from "../../../utils/stateProvider";
import { reducerCases } from "../../../utils/Constants";
import SpotifyWebApi from 'spotify-web-api-node';
import { Container } from 'react-bootstrap';

const spotifyApi = new SpotifyWebApi();

  const Searchbar = (accessToken, navBackground) => {
    const [ {userInfo}, dispatch] = useStateProvider();
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    
    useEffect(() => {
      if (!accessToken) return;
      spotifyApi.setAccessToken(accessToken);
    }, [accessToken]);


  const handleFilter = (event) => {
    const search = event.target.value;
    setSearch(search);
    const newFilter = searchResults.filter((value) => {
      return value.title.toLowerCase().includes(search.toLowerCase());
    });

    if (search === "") {
      setSearchResults([]);
    } else {
      setSearchResults(newFilter);
    }
  };

  const clearInput = () => {
    setSearchResults([]);
    setSearch("");
  };

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    let cancel = false;
    spotifyApi.search(search, ['track', 'album', 'artist', 'playlist'], { limit: 20 }).then(res => {
      if (cancel) return;
      const tracks = res.body.tracks.items.map(track => {
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
      });

      setSearchResults(tracks);
    });

    return () => (cancel = true);
  }, [search, accessToken]);

  return (
    <Container navBackground={navBackground}>
    <div className="search__bar" style={{ height: "100vh" }}>
      <input
        type="text"
        placeholder="Search for an artist, song or album"
        className="searchInput"
        value={search}
        onChange={handleFilter}
      />
      <div className="searchIcon">
        <a href={userInfo?.external_urls?.spotify}>
          <span>{userInfo?.display_name}</span>
        </a>
        <BsSearch className="searchIcon" />
        <span className="m-2">Search</span>
        <CgClose className="closeIcon" onClick={clearInput} />
      </div>
        {searchResults.length === 0 ? (
          <BsSearch className="searchIcon" />
        ) : (
            <CgClose className="closeIcon" onClick={clearInput} />
        )}
      </div>
      <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
        {searchResults.length !== 0 && (
          <div className="searchResults">
            {searchResults.slice(0, 10).map((track) => (
              <TrackSearchResult
                track={track}
                key={track.uri}
                chooseTrack={() => {
                  dispatch({type: reducerCases.SET_PLAYER_TRACKS, playingTrack: track});
                  dispatch({type: reducerCases.SET_PLAYING_TRACK_URI, playingTrackUri: track.uri});
                }}
              />
            ))}
          </div>
        )}
      </div>
    </Container>
  );
};

export default Searchbar;
