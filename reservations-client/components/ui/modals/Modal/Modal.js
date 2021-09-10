/* eslint-disable react/prop-types */
import React from 'react'
import { Fragment } from 'react'
import Backdrop from '../../Backdrop'

const Modal = ({ isShowing, children, onCloseModal, title }) => {
  return (
    <Fragment>
      <Backdrop isShowing={isShowing} onClick={onCloseModal} />
      <div
        className="Modal"
        style={{
          transform: isShowing ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: isShowing ? '1' : '0'
        }}>
        <h3>{title}</h3>
        {children}
        <style jsx>{`
          .Modal {
            position: fixed;
            z-index: 500;
            background-color: white;
            width: 70%;
            border: 1px solid #ccc;
            border-radius: 3px;
            box-shadow: 1px 1px 1px black;
            padding: 1.6rem 2rem;
            left: 15%;
            top: 30%;
            box-sizing: border-box;
            transition: all 0.3s ease-out;
          }

          .Modal h3 {
            text-align: left;
            font-weight: 400;
            font-size: 1.6rem;
            margin-bottom: 1.25rem;
          }

          @media (min-width: 600px) {
            .Modal {
              width: 500px;
              left: calc(50% - 250px);
            }
          }
        `}</style>
      </div>
    </Fragment>
  )
}

export default Modal
