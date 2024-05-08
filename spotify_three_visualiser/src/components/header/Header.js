import React from "react";
// import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import "./Header.module.css";
import Searchbar from "./searchcontainer/SearchBar";

const Header = () => {
    return (
        <Container>
            <div className="header">
                <div className="logo">

                </div>
                <div className="search">
                    <Searchbar />
                </div>
            </div>
        </Container>
    );
}

export default Header;