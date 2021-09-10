/* eslint-disable react/prop-types */
import React from 'react'

const SidebarHeader = ({ brand }) => {
  return (
    <div className="SidebarHeader">
      <div className="SidebarHeader_body">
        <h3>{brand}</h3>
        {/*<img src="images/logo.png" alt="Devdezyn Logo" width="40px" />*/}
        <div className="SidebarHeader_icons">
          <i className="las la-bell"></i>
          <i className="las la-user-circle"></i>
        </div>
      </div>
      <style jsx>{`
        .SidebarHeader {
          height: 7rem;
        }

        .SidebarHeader_body {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .SidebarHeader_icons i {
          font-size: 2.4rem;
          margin-left: 0.5rem;
        }
      `}</style>
    </div>
  )
}

export default SidebarHeader
