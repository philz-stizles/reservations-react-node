import React from 'react'
import PropTypes from 'prop-types'
import SidebarMenuItem from './../SidebarMenuItem/SidebarMenuItem'
import SidebarMenuTitle from './../SidebarMenuTitle/SidebarMenuTitle'

const SidebarMenu = ({ title, menuItems, onClickLink, activeMenuItem }) => {
  return (
    <div data-test="sidebar-menu" className="SidebarMenu">
      {title && <SidebarMenuTitle title={title} />}

      <ul data-test="sidebar-menu-ul">
        {menuItems.map((item) => (
          <SidebarMenuItem
            key={item.id}
            {...item}
            onClickLink={() => onClickLink(item.id)}
            isActive={item.id === activeMenuItem}
          />
        ))}
      </ul>

      <style jsx>{`
        .SidebarMenu {
          margin-top: 3rem;
        }

        .SidebarMenu ul {
          margin-bottom: 1.5rem;
        }
      `}</style>
    </div>
  )
}

SidebarMenu.propTypes = {
  title: PropTypes.string,
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired
    })
  ).isRequired,
  onClickLink: PropTypes.func.isRequired,
  activeMenuItem: PropTypes.string.isRequired
}

export default SidebarMenu
