import {Sidebars} from "../components/sidebar/sidebars";
import React, { useEffect } from "react";
import Body from "../components/Body";
import { useStateProvider } from "../utils/stateProvider";
import axios from "axios";
import { Container } from "react-bootstrap";
import { reducerCases } from "../utils/Constants";

export default function Spotify() {
  const [{ token }, dispatch] = useStateProvider();
  useEffect(() => {
    const getUserInfo = async () => {
      const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      const userInfo = {
        userId: data.id,
        userName: data.display_name,
      };

      dispatch({ type: reducerCases.SET_USER, userInfo });
    };
    getUserInfo();
  }, [dispatch, token]);
  return (
    <Container>
      <div className="spotify_body">
        <Sidebars />
        <div className="body">
          <div className="body_contents">
            <Body />          </div>
        </div>
      </div>
      <div className="spotify_footer">
      </div>
    </Container>
  );
}

// const Container = styled.div`
//   max-width: 100vw;
//   max-height: 100vh;
//   overflow: hidden;
//   display: grid;
//   grid-template-rows: 87vh 13vh;
//   .spotify_body {
//     display: grid;
//     grid-template-columns: 17vw 85vw;
//     hight: 100%;
//     width: 100%;
//     background-color: #010001;
//   }
//   .body {
//     height: 100%;
//     width: 100%;
//     overflow: auto;
//     margin-left: 0.5rem;
//     border-radius: 20px;
//     // background-color: #131313;
//     background: rgb(28, 13, 67);
//     background: linear-gradient(
//       180deg,
//       rgba(78, 71, 75, 0.8) 0%,
//       rgba(18, 18, 18, 1) 100%
//     );
//     &::-webkit-scrollbar {
//       width: 0.7rem;
//       &-thumb {
//         background-color: rgba(255, 255, 255, 0.2);
//       }
//     }
//   }
//     `;