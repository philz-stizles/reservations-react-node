import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useSession } from 'next-auth/client'
// import { useUser } from '@auth0/nextjs-auth0'

// import Auth0LogoutLink from '../../auth/Auth0LogoutLink'
import SidebarHeader from './components/SidebarHeader/SidebarHeader'
import SidebarProfile from './components/SidebarProfile/SidebarProfile'

import classes from './Sidebar.module.css'
import SidebarMenu from './components/SidebarMenu/SidebarMenu'
import LogoutButton from '../../auth/LogoutButton'

const Sidebar = ({ isOpen, blueprint, onClickMenuLink, mainContent }) => {
  console.log('Sidebar', mainContent)
  // const { user, error, isLoading } = useUser()
  const [session] = useSession()
  const [activeMenuItem, setActiveMenuItem] = useState('')

  useEffect(() => {
    setActiveMenuItem(mainContent)
    console.log('Sidebar useEffect', mainContent)
  }, [mainContent])

  const clickLinkHandler = (id) => {
    setActiveMenuItem(id)
    onClickMenuLink(id)
  }
  console.log('Sidebar', isOpen)
  // if (isLoading) return <div>Loading...</div>
  // if (error) return <div>{error.message}</div>

  const sidebarClass = isOpen ? [classes.sidebar] : [classes.sidebar, classes.isClosed]

  return (
    <div className={sidebarClass.join(' ')}>
      <SidebarHeader brand="Devdezyn" />
      <div className={classes['sidebar__main']}>
        <SidebarProfile
          name="Theophilus Ighalo"
          email={session.user.email}
          avatar="/images/user2.jpg"
        />

        <SidebarMenu
          activeMenuItem={activeMenuItem}
          title={blueprint[0].title}
          menuItems={blueprint[0].menuItems}
          onClickLink={clickLinkHandler}
        />

        <SidebarMenu
          activeMenuItem={activeMenuItem}
          title={blueprint[1].title}
          menuItems={blueprint[1].menuItems}
          onClickLink={clickLinkHandler}
        />

        <LogoutButton />
      </div>
    </div>
  )
}

Sidebar.propTypes = {
  mainContent: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  blueprint: PropTypes.array.isRequired,
  onClickMenuLink: PropTypes.func.isRequired
}

export default Sidebar
