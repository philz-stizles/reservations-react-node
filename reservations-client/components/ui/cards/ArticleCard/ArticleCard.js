/* eslint-disable react/prop-types */
import React from 'react'
import classes from './ArticleCard.module.css'

const ArticleCard = ({ title, subTitle, figure, meta, status }) => {
  return (
    <div className={classes['article-card']}>
      <img
        className="img-responsive"
        src="http://detheme.com/templates/perfolio/images/gratisography-358H-p-500.jpeg"
        alt=""
      />
      <div className={classes['article-card__meta']}>
        <span>12/04/2021</span>
      </div>
      <h3 className={classes['article-card__title']}>
        5 Personalities You Need In Your Business To Grow And Succeed
      </h3>
      <p className={classes['article-card__content']}>
        Nullam id dolor id nibh ultricies vehicula ut id elit. Praesent commodo cursus magna, vel
        scelerisque nisl consectetur et.
      </p>
      <a className={classes['article-card__link']} href="">
        Read more >{' '}
      </a>
    </div>
  )
}

export default ArticleCard
