import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import NotificationContext from '../../../store/context/notification-context'
import classes from './Notification.module.css'

const Notification = ({ title, message, status }) => {
  const notificationCtx = useContext(NotificationContext)

  let statusClasses = ''

  if (status === 'success') {
    statusClasses = classes.success
  }

  if (status === 'error') {
    statusClasses = classes.error
  }

  if (status === 'pending') {
    statusClasses = classes.pending
  }

  const activeClasses = `${classes.notification} ${statusClasses}`

  return (
    <div className={activeClasses} onClick={notificationCtx.hideNotification} aria-hidden="true">
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  )
}

Notification.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired
}

export default Notification
