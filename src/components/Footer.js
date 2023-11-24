import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={footerStyles}>
      <nav>
        <NavLink to="/" style={linkStyles} activeStyle={activeLinkStyles} exact>
          Home
        </NavLink>
        <NavLink to="/player" style={linkStyles} activeStyle={activeLinkStyles}>
          Player
        </NavLink>
        <NavLink to="/chart" style={linkStyles} activeStyle={activeLinkStyles}>
          Chart
        </NavLink>
      </nav>
      <p style={copyrightStyles}>© 2023 Tunehub</p>
    </footer>
  );
};

const footerStyles = {
  backgroundColor: '#333',
  color: '#fff',
  padding: '20px',
  textAlign: 'center',
};

const linkStyles = {
  textDecoration: 'none',
  color: '#fff',
  margin: '0 10px',
};

const activeLinkStyles = {
  fontWeight: 'bold',
};

const copyrightStyles = {
  marginTop: '10px',
};

export default Footer;
