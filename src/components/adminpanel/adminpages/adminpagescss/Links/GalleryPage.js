import React from 'react'
import Header from "../../../../header/Header"
import Footer from "../../../../footer/Footer"
import GalleryUpload from '../../GalleryUpload'

const GalleryPage = () => {
  return (
    <div>
        <Header/>
        <GalleryUpload/>
        <Footer/>
    </div>
  )
}

export default GalleryPage;