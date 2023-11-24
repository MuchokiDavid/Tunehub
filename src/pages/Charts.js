import React from 'react'
import NavBar from '../components/NavBar'
import TopSongsComponent from '../components/TopSongsComponent'
import Footer from '../components/Footer'
import Logo from '../components/Logo'

function Charts() {
  return (
    <div>
        <Logo/>
        <NavBar/>
        <TopSongsComponent/>
        <Footer/>
    </div>
  )
}

export default Charts