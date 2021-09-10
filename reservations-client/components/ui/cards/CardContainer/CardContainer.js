/* eslint-disable react/prop-types */
import React from 'react'

const CardContainer = ({ children }) => {
  return (
    <div className="CardContainer">
      {children}
      <style jsx>{`
        .CardContainer {
          display: flex;
          justify-content: center;
          box-shadow: 0 2px 4px rgb(14 30 37 / 12%);
          background-color: #fff;
          padding: 1.5rem;
          border-radius: 3px;
        }
      `}</style>
    </div>
  )
}

export default CardContainer
