
import React from 'react';
import styled from 'styled-components';
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
      <img
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png"
        alt="spotify logo"
        />
        <button onClick={handleClick}>Login with Spotify</button>
        </Container>
      </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  // background-color: #1db954;
  background: rgb(29, 185, 84);
  background: linear-gradient(
    45deg,
    rgba(29, 185, 84, 1) 0%,
    rgba(25, 20, 20, 1) 100%
  );
  gap: 5rem;
  img {
    height: 20vh;
  }
  button {
    padding: 1rem 2rem 1rem 2rem;
    align-items: center;
    border-radius: 5rem;
    border: none;
    display: inline-block;
    transition: all 0.2s ease-in;
    position: relative;
    overflow: hidden;
    font-size: 19px;
    color: black;
    z-index: 1;
    cursor: pointer;
  }
  button:before {
    content: "";
    position: absolute;
    left: 50%;
    transform: translateX(-50%) scaleY(1) scaleX(1.25);
    top: 0%;
    bottom: 100%;
    width: 140%;
    height: 180%;
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 50%;
    display: block;
    transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
    z-index: -1;
  }

  button:after {
    content: "";
    position: absolute;
    left: 55%;
    transform: translateX(-50%) scaleY(1) scaleX(1.45);
    top: 180%;
    width: 160%;
    height: 190%;
    background-color: #1db954;
    border-radius: 50%;
    display: block;
    transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
    z-index: -1;
  }

  button:hover {
    color: #ffffff;
    border: 1px solid #1db954;
  }

  button:hover:before {
    top: -35%;
    background-color: #1db954;
    transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
  }

  button:hover:after {
    top: -45%;
    background-color: #1db954;
    transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
  }
`;

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