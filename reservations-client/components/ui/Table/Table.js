import React from 'react'
import PropTypes from 'prop-types'
import TableRow from './components/TableRow'

const Table = ({ rows }) => {
  return (
    <table width="100%" className="Table">
      <tbody>
        {rows.map((category) => (
          <TableRow key={category._id} {...category} />
        ))}
      </tbody>
      <style jsx>{`
        .Table {
          border-collapse: collapse;
          margin-top: 2rem;
          overflow-x: auto;
        }

        .Table button {
          background: rgba(141, 162, 251, 0.5);
          color: midnightblue;
          border: 1px solid #8da2fb;
          padding: 0.5rem;
          border-radius: 3px;
        }

        .table-responsive {
          overflow: auto;
        }
      `}</style>
    </table>
  )
}

Table.propTypes = {
  rows: PropTypes.array.isRequired
}

export default Table
