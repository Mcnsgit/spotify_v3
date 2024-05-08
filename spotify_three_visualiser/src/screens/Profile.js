import React, { useEffect, useRef, useContext } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";

import { AppContext } from '../utils/AppContextProvider';
import Body from "../components/Body";

import "./SpotifyApi.module.css";

export default function Profile() {
  const {statevalue: {token}, dispatch, reducer, userInfo} = useContext(AppContext);
  const bodyRef = useRef();

  useEffect(() => {
    if (token) {
      const getUserInfo = async () => {
        try {
          const { data } = await axios.get("https://api.spotify.com/v1/me", {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
          dispatch({
            type: reducer.SET_USER,
            userInfo: {
              accessToken: data.accessToken,
              userId: data.id,
              userUrl: data.external_urls.spotify,
              name: data.display_name,
              email: data.email, // Assuming email is part of the data you receive
            },
          });
        } catch (error) {
          console.error("Failed to fetch user info:", error);
        }
      };
      getUserInfo();
    }
  }, [token, dispatch, reducer]);

  const handleLogout = () => {
    dispatch({ type: reducer.LOGOUT });
    window.location = "/";
  };

  return (
    <Container>
      <div className="spotify__container">
        <div className="spotify__header">
          <div className="spotify__headerLeft">
            <img src={userInfo?.userUrl || ""} alt={`${userInfo?.name}'s profile`} />
            <h1>Spotify</h1>
            <h3>{userInfo?.name}</h3>
            <h3>{userInfo?.email}</h3>
            <h3>{userInfo?.userId}</h3> 
          </div>
          </div>
          </div>

          <div className="spotify__headerRight">
            <button onClick={() => bodyRef.current.scrollIntoView()}>Profile</button>
                
            <button onClick={handleLogout}>Logout</button>


        </div>
        <div className="body" ref={bodyRef}>
          <div className="body__contents">
            <div className="body__info"> <h3>Profile</h3></div>
            <Body />

        </div>
        <div>

        
        </div>
      </div>    
    
    </Container>  
    
      );
}