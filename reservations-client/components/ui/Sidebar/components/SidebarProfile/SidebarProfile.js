import React from 'react'
import PropTypes from 'prop-types'

const SidebarProfile = ({ name, email, avatar }) => {
  return (
    <div className="SidebarProfile">
      <img src={avatar} alt="User" />
      <div>
        <h3>{name}</h3>
        <span>{email}</span>
      </div>

      <style jsx>{`
        .SidebarProfile {
          margin: 1rem 0 1rem 0;
          text-align: center;
        }

        .SidebarProfile img {
          width: 11rem;
          height: 11rem;
          border-radius: 50%;
          border-left: 0.2rem solid transparent;
          border-right: 0.2rem solid #efefef;
          border-bottom: 0.2rem solid #efefef;
          border-top: 0.2rem solid #efefef;
        }

        .SidebarProfile h3 {
          /* font-size: 1rem; */
          font-size: 1.4rem;
        }

        .SidebarProfile span {
          font-size: 1.2rem;
        }
      `}</style>
    </div>
  )
}

SidebarProfile.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired
}

export default SidebarProfile
