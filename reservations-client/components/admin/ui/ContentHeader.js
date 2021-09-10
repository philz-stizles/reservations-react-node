/* eslint-disable react/prop-types */
import React from 'react'

const ContentHeader = ({ title, subTitle, children }) => {
  return (
    <div className="ContentHeader">
      <div>
        <h2>{title}</h2>
        <small>{subTitle}</small>
      </div>

      <div className="ContentHeader__actions">{children}</div>

      <style jsx>{`
        .ContentHeader {
          display: flex;
          justify-content: space-between;
          margin-bottom: 3rem;
        }

        .ContentHeader h2 {
          font-weight: 400;
          color: #495057;
        }

        .ContentHeader h2 i {
          font-size: 3.2rem;
          margin-right: 0.5rem;
          color: #b4b8bc;
        }

        .ContentHeader small {
          font-size: 1.4rem;
          color: #a5a5a5;
          // color: #b4b8bc;
        }
      `}</style>
    </div>
  )
}

export default ContentHeader
