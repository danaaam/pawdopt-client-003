import React from 'react'
import Home from "../pages/Home"
import AdoptionInfo from "../pages/AdoptionInfo"
import Testimonials from "../pages/Testimonials.js"
import Header from '../header/Header'
import Footer from '../footer/Footer'

const HomePage = () => {
  return (
    <div>
        <Header/>
        <br />
        <Home/>
        <br />
        <br />
        <AdoptionInfo/>
        <br />
        <br />
        <Testimonials/>
        <br />
        <br />
        <Footer/>
    </div>
  )
}

export default HomePage