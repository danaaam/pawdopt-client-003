import React from 'react'
import Header from "../../../../header/Header"
import Footer from "../../../../footer/Footer"
import ArchivedRequests from '../../ArchivedRequests';

const ArchivedPage = () => {
  return (
    <div>
        <Header/>
        <ArchivedRequests/>
        <Footer/>
    </div>
  )
}

export default ArchivedPage;