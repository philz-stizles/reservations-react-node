import React from 'react'
import PropTypes from 'prop-types'

const SidebarMenuTitle = ({ title }) => {
  return (
    <div data-test="sidebar-menu-title" className="SidebarMenuTitle">
      <span data-test="menu-title">{title}</span>
      <style jsx>{`
        .SidebarMenuTitle {
          color: #8da2fb;
          /* font-size: .75rem; */
          /* font-size: 1rem; */
          font-size: 1.2rem;
          font-weight: 500;
          margin-bottom: 0.8rem;
        }
      `}</style>
    </div>
  )
}

SidebarMenuTitle.propTypes = {
  title: PropTypes.string.isRequired
}

export default SidebarMenuTitle
