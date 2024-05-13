
import React from 'react';
import { Container } from 'react-bootstrap';
import './Login.css';

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
     window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUrl)}&scope=${encodeURIComponent(scope.join(" "))}&response_type=token&show_dialog=true`;
};
  return (
    <>
    <Container>
      <button onClick={handleClick}>Login with Spotify</button>
      <img
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png"
        alt="spotify logo"
        />
        </Container>
      </>
  );
}


// const AUTH_URL =
//   "https://accounts.spotify.com/authorize?client_id=1f42356ed83f46cc9ffd35c525fc8541&response_type=code&redirect_uri=http://localhost:3001&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

// export default function Login() {
//   return (
//     <Container
//       className="d-flex justify-content-center align-items-center"
//       style={{ minHeight: "100vh" }}
//     >
//       <a className="btn btn-success btn-lg" href={AUTH_URL}>
//         Login With Spotify
//       </a>
//     </Container>
//   )
// }