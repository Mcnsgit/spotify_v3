import React, { useState, useEffect } from "react";
import axios from "axios";
import Body from  "../components/Body";

export default function SpotifyApi() {
  const [accessToken, setAccessToken] = useState("");
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState(null);

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("key");
    if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];
      window.location.hash = "";
      window.localStorage.setItem("key", token);
      setAccessToken(token);
    }
  }, []);

  useEffect(() => {
    if (!accessToken) return;

    const fetchUserInfo = async () => {
      const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      const userInfo = {
        userId: data.id,
        userName: data.display_name,
      };
      window.localStorage.setItem("userInfo", JSON.stringify(userInfo));
    };

    fetchUserInfo();
  }, [accessToken]);

  const logout = () => {
    setAccessToken("");
    window.localStorage.removeItem("key");
  }

  const chooseTrack = (track) => {
    setPlayingTrack(track);
    setSearch("");
  };

  const handleScroll = () => {
    const body = document.querySelector(".body_contents");
    body.classList.toggle("body_scroll", window.pageYOffset > 0 || window.pageYOffset === 0)(body.scrollTop >= 268);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const searchTrack = async (e) => {
    e.preventDefault();
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        q: search,
        type: "track",
      },
    });
    setSearchResults(data.tracks.items);
  };

  return (
    <div className="spotify_body">
      <Body
        searchResults={searchResults}
        setSearchResults={setSearchResults}
        chooseTrack={chooseTrack}
        searchTrack={searchTrack}
        playingTrack={playingTrack}
      />
      <form onSubmit={searchTrack}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">
          Search
        </button>
      </form>
      <button onClick={logout}>Logout</button>
    </div>
  );
}