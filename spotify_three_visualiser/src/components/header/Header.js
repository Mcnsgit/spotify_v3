import React from "react";
import { Link, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import "./Header.module.css";
import Searchbar from "./searchcontainer/SearchBar";
import { AppProvider } from "../../utils/AppContextProvider";

const Header = () => {
    const [{ userInfo }] = AppProvider.useContext();
    return (
        <Container className="header-container">
            <div className="header">

                <div className="search">
                    <Searchbar />
                </div>
                <div className="UserInfo">
                    <p>User Profile</p>
                    <Navigate to="/profile" />
                </div>
                <div className="UserInfo">
                    <Link>${userInfo?.userName}</Link>


                </div>
            </div>
        </Container>
    );
}

export default Header;