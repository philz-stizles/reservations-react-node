/* eslint-disable react/prop-types */
import React, { forwardRef } from 'react'

const CustomInput = (props, ref) => {
  return (
    <div data-test="custom-input" className="CustomInput">
      {props.label && (
        <label data-test="custom-input-label" htmlFor={props.label}>
          {props.label}
        </label>
      )}
      {props.icon && <i className={props.icon} />}
      <input data-test="custom-input-input" ref={ref} {...props} />
      <style jsx>{`
        .CustomInput {
          position: relative;
          margin-bottom: 1rem;
        }

        .CustomInput label {
          font-size: 1.4rem;
          font-weight: 600;
          display: inline-block;
          margin-bottom: 0.5rem;
        }

        .CustomInput input {
          // width: 440px;
          max-width: 100%;
          margin-right: 5px;
          padding: 0.5rem ${props.icon ? '4.2rem' : '1.5rem'};
          font-size: 1.4rem;
          line-height: 20px;
          color: #24292e;
          vertical-align: middle;
          background-color: #fafbfc;
          background-repeat: no-repeat;
          background-position: right 8px center;
          border: 1px solid #e1e4e6;
          border-radius: 6px;
          outline: none;
          box-shadow: inset 0 1px 0 rgba(225, 228, 232, 0.2);
          display: block;
          width: 100%;
          // height: calc(2.875rem + 2px);
          // padding: 2rem 1rem;
          // font-size: 1.25rem;
          // font-weight: 400;
          // line-height: 1.5;
          // color: #495057;
          // background-color: #fff;
          // background-clip: padding-box;
          // border: 1px solid #ced4da;
          // border-radius: 0.3rem;
          transition: all 0.2s;
        }

        .CustomInput input:focus {
          background-color: #fff;
          border-color: #0366d6;
          outline: none;
          box-shadow: 0 0 0 3px rgba(3, 102, 214, 0.3);
        }

        .CustomInput i {
          position: absolute;
          top: 50%;
          left: 1rem;
          font-size: 2.4rem;
          transform: translateY(-50%);
        }
      `}</style>
    </div>
  )
}

export default forwardRef(CustomInput)
