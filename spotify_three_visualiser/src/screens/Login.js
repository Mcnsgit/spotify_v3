
import React from 'react';
import { Container } from 'react-bootstrap';
export default function Login() {
    const handleClick = () => {
        const clientId = '1f42356ed83f46cc9ffd35c525fc8541';
        const redirectUrl = "http://localhost:3001";
        const apiUrl = "https://accounts.spotify.com/authorize";
        const scope = [
            "user-read-email",
            "user-read-private",
            "user-modify-playback-state",
            "user-read-playback-state",
            "user-read-currently-playing",
            "user-read-recently-played",
            "user-read-playback-position",
            "user-top-read",
            "playlist-read-private",
        ];
        window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join(
            " "
        )}&response_type=token&show_dialog=true`;
    };
    return (
        <Container>
            <img
                src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png"
                alt="spotify logo"
            />
            <button onClick={handleClick}>Login with Spotify</button>
        </Container>
    );
}

