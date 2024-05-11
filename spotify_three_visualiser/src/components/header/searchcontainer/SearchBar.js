import React, { useState, useEffect } from 'react';
import TrackSearchResult from './TrackSearchResults';
import "./TrackSearch.module.css";
import SpotifyWebApi from 'spotify-web-api-node';
import { Container, Form } from 'react-bootstrap';

const spotifyApi = new SpotifyWebApi({
  clientId: "1f42356ed83f46cc9ffd35c525fc8541",
});

export default function Searchbar({ accessToken }) {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (!search || !accessToken) {
      setSearchResults([]);
      return;
    }

    let cancel = false;
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.searchTracks(search).then(res => {
      if (cancel) return;
      setSearchResults(res.body.tracks.items.map(track => ({
        artist: track.artists[0].name,
        title: track.name,
        uri: track.uri,
        albumUrl: track.album.images.reduce((smallest, image) => {
          return image.height < smallest.height ? image : smallest;
        }, track.album.images[0]).url,
      })));
    });

    return () => { cancel = true; };
  }, [search, accessToken]);

  return (
    <Container className="d-flex flex-column py-2" style={{ height: "20vh", overflowY: "auto" }}>
      <Form.Control
        className="mx-2"
        type="search"
        placeholder="Search Songs/Artists"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
        {searchResults.map(track => (
          <TrackSearchResult track={track} key={track.uri} />
        ))}
      </div>
    </Container>
  );
}
