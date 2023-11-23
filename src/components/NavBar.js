import React from 'react'
import { NavLink } from "react-router-dom";

const navStyles = {
  display: 'flex',
  backgroundColor: 'darkblue',
  padding: '10px',
};

const linkStyles = {
  textDecoration: 'none',
  color: 'white',
  margin: '0 10px',
  padding: '8px',
  borderRadius: '5px',
  transition: 'background 0.3s',
};

const activeLinkStyles = {
  background: 'lightblue',
};

  function NavBar() {
    return(
    <div style={navStyles}>
    <NavLink to="/" exact style={linkStyles} activeStyle={activeLinkStyles}>
      Home
    </NavLink>
    <NavLink to="/player" exact style={linkStyles} activeStyle={activeLinkStyles}>
      Playlist
    </NavLink>
    <NavLink to="/chart" exact style={linkStyles} activeStyle={activeLinkStyles}>
      Charts
    </NavLink>
  </div>
    );
  }

export default NavBar