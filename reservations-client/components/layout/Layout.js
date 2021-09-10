/* eslint-disable react/prop-types */
import React, { Fragment } from 'react'
import Footer from './Footer/Footer'
import Navbar from './Navbar/Navbar'

const Layout = ({ children }) => {
  return (
    <Fragment>
      <main>{children}</main>
      <Footer />
    </Fragment>
  )
}

export default Layout
