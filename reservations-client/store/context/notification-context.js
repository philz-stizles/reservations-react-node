/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react'

const NotificationContext = createContext({
  notification: null, // {title, message, status }
  // eslint-disable-next-line no-unused-vars
  showNotification: (notificationData) => {},
  hideNotification: () => {}
})

export const NotificationProvider = ({ children }) => {
  const [activeNotification, setActiveNotification] = useState(null)

  useEffect(() => {
    if (
      activeNotification &&
      (activeNotification.status === 'success' || activeNotification.status === 'error')
    ) {
      const notificationTimer = setTimeout(() => {
        setActiveNotification(null)
      }, 3000)

      return () => {
        if (notificationTimer) {
          clearTimeout(notificationTimer)
        }
      }
    }
  }, [activeNotification])

  const showNotification = (notificationData) => {
    setActiveNotification(notificationData)
  }

  const hideNotification = () => {
    setActiveNotification(null)
  }

  return (
    <NotificationContext.Provider
      value={{
        activeNotification,
        showNotification,
        hideNotification
      }}>
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
