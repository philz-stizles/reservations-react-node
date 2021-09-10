import React from 'react'
import classes from './Header.module.css'

const Header = () => {
  return (
    <header className={classes['Header']}>
      <div className={classes['menu__toggle']}>
        <div
          className={classes.sidebar__toggle}
          onClick={() => {
            console.log('here')
            // setIsSidebarOpen(!isSidebarOpen)
          }}
          aria-hidden="true">
          <i className="las la-bars"></i>
        </div>
      </div>

      <div className={classes['Header__icons']}>
        <i className="las la-search"></i>
        <i className="las la-bookmark"></i>
        <i className="las la-sms"></i>
      </div>
    </header>
  )
}

export default Header
