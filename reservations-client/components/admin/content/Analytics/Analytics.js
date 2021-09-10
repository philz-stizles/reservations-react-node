import React, { Fragment } from 'react'
import StatsCard from '../../../ui/cards/StatsCard/StatsCard'
import classes from './Analytics.module.css'
import categories from '../../../../data/categories'
import TableRow from '../../../ui/Table/components/TableRow'
import ContentHeader from '../../ui/ContentHeader'
import IconButton from '../../../ui/buttons/IconButton'

const Analytics = () => {
  console.log(categories)
  return (
    <Fragment>
      <ContentHeader
        title="Analytics dashboard"
        subTitle="Monitor key metrics. Check reporting and review insights">
        <IconButton label="Export" icon="las la-file-export" />
        <IconButton label="Settings" icon="las la-tools" />
      </ContentHeader>

      <div className={classes.analyticsCards}>
        <StatsCard
          title="Purchases"
          subTitle="Number of purchases"
          figure="17,663"
          meta="2% less purchase"
          status="danger"
        />

        <StatsCard
          title="Refunds"
          subTitle="Value of refunded orders"
          figure="$4,523.11"
          meta="10% less refund"
          status="success"
        />

        <StatsCard
          title="Unique Visitors"
          subTitle="Number of visitors"
          figure="46,085"
          meta="2% less visitors"
          status="info"
        />
      </div>

      <div className={classes['jobs-grid']}>
        <div className={classes['analytics__card']}>
          <div className={classes['analytics__head']}>
            <h3>Actions needed</h3>
            <i className="las la-ellipsis-h"></i>
          </div>

          <div className={classes['analytics__chart']}>
            <div className={classes['chart-circle']}>
              <h1>74%</h1>
            </div>

            <div className={classes['analytics__note']}>
              <small>Note: Current sprint requires stakeholders meeting to reach conclusion</small>
            </div>
          </div>

          <div className={classes['analytics__btn']}>
            <button>Generate report</button>
          </div>
        </div>

        <div className={classes.jobs}>
          <h2>
            Jobs{' '}
            <small>
              See all jobs <i className="las la-arrow-right"></i>
            </small>
          </h2>
          <div className={classes['table-responsive']}>
            <table width="100%">
              <tbody>
                {categories.map((category) => (
                  <TableRow key={category.id} {...category} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Analytics
