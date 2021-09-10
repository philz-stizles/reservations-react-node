import React, { Fragment, useContext, useEffect, useState } from 'react'
import { getSession } from 'next-auth/client' // getSession can be used on both client-side and client-side
// import { withPageAuthRequired } from '@auth0/nextjs-auth0'

import SideBar from '../../components/ui/Sidebar/Sidebar'
import Header from '../../components/ui/Header.js/Header'
import Analytics from '../../components/admin/content/Analytics/Analytics'
import TagMgt from '../../components/admin/content/Tag/TagMgt'
import CategoryMgt from '../../components/admin/content/Category/CategoryMgt/CategoryMgt'

import classes from '../../styles/admin/dashboard.module.css'
import BlogMgt from '../../components/admin/content/Blog/BlogMgt'
import PortfolioMgt from '../../components/admin/content/Portfolio/PortfolioMgt'
import NotificationContext from '../../store/context/notification-context'
import Notification from '../../components/ui/alerts/Notification'
// import Backdrop from '../../components/ui/Backdrop'
// import Modal from '../../components/ui/modals/Modal/Modal'

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  // ANIT- PATTERN
  // let initMainContent
  // if (process.browser) {
  //   console.log('process.browser', process.browser)
  //   const devdezynLocalData = localStorage.getItem('devdezynData')
  //   if (devdezynLocalData) {
  //     const parsedLocalData = JSON.parse(devdezynLocalData)
  //     if (parsedLocalData.selectedMenuItem.trim() !== '') {
  //       initMainContent = parsedLocalData.selectedMenuItem
  //     }
  //   }
  // }
  const [mainContent, setMainContent] = useState('')
  const notificationCtx = useContext(NotificationContext)
  // const [isModalOpen, setIsModalOpen] = useState(true)

  useEffect(() => {
    const devdezynLocalData = localStorage.getItem('devdezynData')
    if (devdezynLocalData) {
      const parsedLocalData = JSON.parse(devdezynLocalData)
      if (parsedLocalData.selectedMenuItem.trim() !== '') {
        setMainContent(parsedLocalData.selectedMenuItem)
      }
    }
  }, [])

  const mainContentClass = isSidebarOpen
    ? [classes['main-content']]
    : [classes['main-content'], classes['sidebar-closed']]

  let mainContentComponent

  // const toggleSidebar = () => {
  //   setIsSidebarOpen(!isSidebarOpen)
  // }

  switch (mainContent) {
    case 'a':
      mainContentComponent = <Analytics />
      break

    case 't':
      mainContentComponent = <TagMgt />
      break

    case 'c':
      mainContentComponent = <CategoryMgt />
      break

    case 'b':
      mainContentComponent = <BlogMgt />
      break

    case 'p':
      mainContentComponent = <PortfolioMgt />
      break

    default:
      mainContentComponent = <Analytics />
      break
  }

  const SidebarBlueprint = [
    {
      title: 'Applications',
      menuItems: [
        { id: 'a', name: 'Analytics', icon: 'las la-tachometer-alt' },
        { id: 't', name: 'Tags', icon: 'las la-project-diagram' },
        { id: 'c', name: 'Categories', icon: 'las la-object-group' },
        { id: 'b', name: 'Blogs', icon: 'las la-blog' },
        { id: 'p', name: 'Portfolio', icon: 'las la-briefcase' }
      ]
    },
    {
      title: 'Settings',
      menuItems: [
        { id: 'up', name: 'Profile', icon: 'las la-user-cog' },
        { id: 'n', name: 'Notifications', icon: 'las la-comment' },
        { id: 'tk', name: 'Tasks', icon: 'las la-tasks' }
      ]
    }
  ]

  console.log('Dashboard', mainContent)

  return (
    <Fragment>
      <SideBar
        isOpen={isSidebarOpen}
        mainContent={mainContent}
        blueprint={SidebarBlueprint}
        onClickMenuLink={(id) => {
          setMainContent(id)
          const devdezynLocalData = {
            selectedMenuItem: id
          }
          localStorage.setItem('devdezynData', JSON.stringify(devdezynLocalData))
        }}
      />
      <div className={mainContentClass.join(' ')}>
        <Header onToggleBars={setIsSidebarOpen} />
        <main className={classes['main-content__main']}>{mainContentComponent}</main>
      </div>
      {notificationCtx.activeNotification && (
        <Notification
          title={notificationCtx.activeNotification.title}
          message={notificationCtx.activeNotification.message}
          status={notificationCtx.activeNotification.status}
        />
      )}
    </Fragment>
  )
}

// getServerSideProps runs for every incoming request to the server
export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req })

  if (!session) {
    return {
      redirect: {
        destination: '/admin/auth',
        permanent: false
      }
    }
  }

  return {
    props: { session }
  }
}

export default AdminDashboard
// export default withPageAuthRequired(AdminDashboard)
