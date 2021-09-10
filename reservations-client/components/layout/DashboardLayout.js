/* eslint-disable react/prop-types */
import React, { Fragment } from 'react'
import Navbar from './Navbar/Navbar'

const DashboardLayout = ({ children }) => {
  return (
    <Fragment>
      <Navbar />
      <main>{children}</main>
    </Fragment>
  )
}

export default DashboardLayout
