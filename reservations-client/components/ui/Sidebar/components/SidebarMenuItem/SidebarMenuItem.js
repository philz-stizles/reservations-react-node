import React from 'react'
import PropTypes from 'prop-types'

const SidebarMenuItem = ({ name, icon, onClickLink, isActive }) => {
  const sidebarClasses = isActive ? ['SidebarMenuItem', 'active'] : ['SidebarMenuItem']
  return (
    <li
      data-test="list-item"
      className={sidebarClasses.join(' ')}
      onClick={onClickLink}
      aria-hidden="true">
      <i data-test="list-item-icon" className={icon} />
      <span data-test="list-item-text"> {name}</span>
      <style jsx>{`
        .SidebarMenuItem {
          margin-bottom: 0.9rem;
          color: #efefef;
          font-size: 1.4rem;
          display: flex;
          align-items: center;
          cursor: pointer;
          border-left-width: 3px;
          border-left-style: solid;
          border-left-color: transparent;
          transition: all 0.3s;
        }

        .SidebarMenuItem.active {
          padding-left: 0.5rem;
          border-left-color: #8da2fb;
        }

        .SidebarMenuItem.active i {
          color: #8da2fb;
        }

        .SidebarMenuItem i {
          font-size: 2.4rem;
          display: inline-block;
          margin-right: 1rem;
        }
      `}</style>
    </li>
  )
}

SidebarMenuItem.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string,
  onClickLink: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired
}

export default SidebarMenuItem
