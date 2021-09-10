/* eslint-disable react/prop-types */
import React from 'react'
import moment from 'moment'

const TableRow = ({ name, description, createdBy, createdAt, status }) => {
  return (
    <tr className="TableRow">
      <td>
        <div>
          <span className="TableRow__indicator"></span>
        </div>
      </td>
      <td>
        <div>{name}</div>
      </td>
      <td>
        <div>{description}</div>
      </td>
      <td>
        <div>{createdBy}</div>
      </td>
      <td>
        <div>{moment(createdAt).fromNow()}</div>
      </td>
      <td>
        <div>
          <button>{status}</button>
        </div>
      </td>

      <style jsx>{`
        .TableRow div {
          background: #fff;
          margin-bottom: 0.8rem;
          height: 5rem;
          display: flex;
          align-items: center;
          /* padding: .5rem; */
          padding: 1rem;
          font-size: 1.2rem;
          color: #444;
          // font-weight: 500;
        }

        .TableRow__indicator {
          height: 1.5rem;
          width: 1.5rem;
          background: #c9f7f5;
          border-radius: 50%;
        }

        .TableRow:nth-of-type(even) .TableRow__indicator {
          background: #fff4de;
        }
      `}</style>
    </tr>
  )
}

export default TableRow
