import React, { Fragment } from 'react'
import IconButton from '../../../ui/buttons/IconButton'
import ContentHeader from '../../ui/ContentHeader'

const PortfolioMgt = () => {
  return (
    <Fragment>
      <ContentHeader title="Manage Portfolio" subTitle="Create and edit portfolio">
        <IconButton label="Create new" icon="las la-plus-square" />
      </ContentHeader>
    </Fragment>
  )
}

export default PortfolioMgt
