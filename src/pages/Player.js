import React from 'react'
import NavBar from '../components/NavBar'
import Player from '../components/Player'
import Footer from '../components/Footer'
import Logo from '../components/Logo'

function Player() {
  return (
    <div>
        <Logo/>
        <NavBar/>
        <Player/>
        <Footer/>
    </div>
  )
}

export default Player