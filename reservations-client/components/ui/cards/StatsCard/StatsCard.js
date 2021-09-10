/* eslint-disable react/prop-types */
import React from 'react'
import classes from './Stats.module.css'

const StatsCard = ({ title, subTitle, figure, meta, status }) => {
  return (
    <div className={classes.card}>
      <div className={classes['card-grid']}>
        <div className={classes.card__info}>
          <div className={classes.card__head}>
            <span>{title}</span>
            <small>{subTitle}</small>
          </div>

          <h2>{figure}</h2>

          <small>{meta}</small>
        </div>

        <div className={[classes.card__chart, classes[status]].join(' ')}>
          <i className="las la-chart-line"></i>
        </div>
      </div>
    </div>
  )
}

export default StatsCard
