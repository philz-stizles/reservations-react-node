/* eslint-disable react/prop-types */
import React from 'react'
import Loader from '../loaders/Loader'

const IconButton = ({ label, icon, onClick, expand, isLoading }) => {
  return (
    <button className="IconButton" onClick={onClick}>
      {icon && <i className={icon} />} {isLoading ? <Loader color="#fff" /> : label}
      <style jsx>{`
        .IconButton {
          outline: none;
          background: #5850ec;
          color: #fff;
          border: none;
          border-radius: 5px;
          padding: 0.6rem 1rem;
          width: ${expand ? '100%' : 'auto'};
          // margin-left: 1rem;
          font-weight: 500;
          /* font-weight: 600; */
        }

        .IconButton i {
          font-size: 1.6rem;
          margin-right: 0.6rem;
        }
      `}</style>
    </button>
  )
}

export default IconButton
