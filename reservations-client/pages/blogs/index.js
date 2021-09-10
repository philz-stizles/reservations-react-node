import React from 'react'
import Strapi from 'strapi-sdk-javascript/build/main'
import PropTypes from 'prop-types'
import Layout from '../../components/layout/Layout'
import ArticleCard from './../../components/ui/cards/ArticleCard/ArticleCard'
// Styles
import classes from '../../styles/blogs.module.css'

const baseURL = process.env.NEXT_PUBLIC_STRAPI_API_URL
const strapi = new Strapi(baseURL)

const BlogsPage = () => {
  return (
    <Layout>
      {/** 
        Remember with inline jsx styles some features are not available e.g :hover etc. 
        You can use Radium hoc to unlock those features 
      */}
      <header className={classes.header}>
        <div className={classes.cta}>
          <h2 className={classes['cta__title']}>Welcome to Our Blog</h2>
          <p className={classes['cta__subtitle']}></p>
        </div>
      </header>
      <section className={classes.section}>
        <div className="container">
          <div className={classes['section__title']}>
            <h2>Recent posts</h2>
            <h4>See more</h4>
          </div>
          <div className={[classes['latest__grid']].join(' ')}>
            <ArticleCard />
            <ArticleCard />
            <ArticleCard />
          </div>
        </div>
      </section>
    </Layout>
  )
}

BlogsPage.propTypes = {
  blogs: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired
}

export const getStaticProps = async () => {
  try {
    const { data } = await strapi.request('POST', '/graphql', {
      data: {
        query: `query {
          categories {
            id
            name
          }
          blogs {
            id
            title
            content
            image {
              url
              name
            }
            category {
              id
              name
            }
          }
        }`
      }
    })

    console.log(data)
    const { categories, blogs } = data

    return {
      props: { categories, blogs }
    }
  } catch (error) {
    console.log(error.message)
    return {
      props: {
        error: error.message
      }
    }
  }
}

export default BlogsPage
