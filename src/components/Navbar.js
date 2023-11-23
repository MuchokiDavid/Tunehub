import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" exact activeClassName="active">
          Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/playlist" activeClassName="active">
            Playlist
          </NavLink>
        </li>
        <li>
          <NavLink to="/charts" activeClassName="active">
            Charts
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;