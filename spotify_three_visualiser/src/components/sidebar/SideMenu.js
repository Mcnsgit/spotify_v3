import React from "react";
import { NavLink } from "react-router-dom";
import { Container } from "react-bootstrap";
import {MenuButtons} from "./MenuButtons";
import {Sidebars} from "./sidebars";
import "./Sidebar.module.css";


const  SideMenu= ()=>{
  const buttons = [
    { to: "/", label: "Home", icon: "home" },
    { to: "/searchbar", label: "Search", icon: "search" },
    { to: "/library", label: "Your Library", icon: "library" },
    { to: "/favorites", label: "Favourites", icon: "favorites" },
    { to: "/recently-played", label: "Recently Played", icon: "recently-played" },
    { to: "/profile", label: "User Profile", icon: "user-profile" },
  ];

  return (
    <Container>
      <div className='sidebar'>
        <strong className='sidebarTitle'>Menu</strong>
        <nav>
          <Sidebars />
          {buttons.map(btn => (
            <NavLink key={btn.label} to={btn.to} activeClassName='active' className='sidebarButton'>
              <MenuButtons iconClass={btn.icon} label={btn.label} />
            </NavLink>
          ))}
        </nav>
      </div>
    </Container>
  );
}

export default SideMenu;