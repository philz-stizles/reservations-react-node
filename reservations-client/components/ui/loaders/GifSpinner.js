import React, { Fragment } from 'react'

const spinnerStyles = {
  width: '200px',
  margin: 'auto',
  display: 'block'
}

const GifSpinner = () => (
  <Fragment>
    <img src="/images/spinner.gif" alt="Loading..." style={spinnerStyles} />
  </Fragment>
)

export default GifSpinner
