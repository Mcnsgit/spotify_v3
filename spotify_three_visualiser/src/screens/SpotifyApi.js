import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./SpotifyApi.module.css";
import Dashboard from "./Dashboard";

export default function Spotify(code) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresAt, setExpiresAt] = useState(0);

  const fetchAccessToken = useCallback(async () => {
    try {
      const response = await axios.post("http://localhost:8080/auth/refresh", {
        refresh_token: refreshToken,
      });
      const { accessToken, expiresIn } = response.data;
      const expirationTime = Date.now() + expiresIn * 1000;
      setAccessToken(accessToken);
      setExpiresAt(expirationTime);
    } catch (error) {
      console.error("Failed to fetch access token:", error);
      window.location = "/";
    }
  }, [refreshToken]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");
    const expiresIn = params.get("expires_in");

    if (accessToken && refreshToken && expiresIn) {
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setExpiresAt(Date.now() + expiresIn * 1000);
      window.history.pushState({}, null, "/dashboard");
    }
  }, []);

  useEffect(() => {
    const refreshToken = () => {
      if (Date.now() >= expiresAt) {
        fetchAccessToken();
      }
    };

    const timer = setInterval(refreshToken, 60000);

    return () => {
      clearInterval(timer);
    };
  }, [expiresAt, fetchAccessToken]);

  return <Dashboard accessToken={accessToken} />;
}