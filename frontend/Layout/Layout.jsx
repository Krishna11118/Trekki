import React from 'react'
import Header from '../src/components/Header/Header'
import Footer from '../src/components/Footer/Footer'
import Routers from '../src/router/Routers'

const Layout = () => {
  return (
    <>
   <Header/>
   <Routers/>
   <Footer/>
   </>
  )
}

export default Layout