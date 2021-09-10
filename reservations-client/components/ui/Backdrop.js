import React from 'react'
import PropTypes from 'prop-types'

const Backdrop = ({ isShowing, onClick }) => {
  return isShowing ? (
    <div onClick={onClick} className="Backdrop" aria-hidden="true">
      <style jsx>{`
        .Backdrop {
          position: fixed;
          z-index: 100;
          background-color: rgba(0, 0, 0, 0.75);
          width: 100%;
          height: 100vh;
          top: 0;
          left: 0;
        }
      `}</style>
    </div>
  ) : null
}

Backdrop.propTypes = {
  onClick: PropTypes.func.isRequired,
  isShowing: PropTypes.bool.isRequired
}

export default Backdrop
