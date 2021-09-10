/* eslint-disable react/prop-types */
import React from 'react'

const Button = ({ children }) => {
  return (
    <button className="Button">
      {children}
      <style jsx>{`
        .Button {
          background-color: #57b962;
          color: #fff;
          padding: 1rem 2.2rem;
          border-radius: 5px;
          font-size: 1.4rem;
          font-family: inherit;
        }
      `}</style>
    </button>
  )
}

export default Button
