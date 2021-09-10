import React from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import classes from './TagOutlined.module.css'

const TagOutlined = ({ text, href, onCancel }) => {
  if (href) {
    return (
      <Link href={href}>
        <a className={classes.link}>{text}</a>
      </Link>
    )
  } else {
    return (
      <div className={classes.link}>
        {text}
        <span onClick={onCancel} aria-hidden="true">
          x
        </span>
      </div>
    )
  }
}

TagOutlined.propTypes = {
  text: PropTypes.string.isRequired,
  href: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
}

export default TagOutlined
