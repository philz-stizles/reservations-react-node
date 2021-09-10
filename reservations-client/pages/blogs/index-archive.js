import React from 'react'
import Image from 'next/image'
import Strapi from 'strapi-sdk-javascript/build/main'
import PropTypes from 'prop-types'
import classes from '../../styles/blogs.module.css'
import Layout from '../../components/layout/Layout'
import BlogCategories from '../../components/blogs/BlogCategories/BlogCategories'
import FlatCard from '../../components/blogs/cards/FlatCard/FlatCard'

const baseURL = process.env.NEXT_PUBLIC_STRAPI_API_URL
console.log(baseURL)
const strapi = new Strapi(baseURL)

const BlogsPage = ({ blogs, categories }) => {
  return (
    <Layout>
      {/** 
        Remember with inline jsx styles some features are not available e.g :hover etc. 
        You can use Radium hoc to unlock those features 
      */}
      <div
        style={{
          'background-color': '#F8F8FA'
        }}>
        <div className="container">
          <BlogCategories categories={categories} />

          <section className={['u-mb-xlarge', classes.latest].join(' ')}>
            <div className="row-between-centered u-mb-medium">
              <h1 className={classes.heading}>Latest</h1>
              <div className={classes['latest-link']}>View more</div>
            </div>

            <div className={classes['latest__grid']}>
              <div className={classes['article']}>
                <Image src={'/images/drone.jpg'} alt="Drone tech" width={650} height={650} />
                <article className={classes['article__caption']}>
                  <h5 className={classes['article__category']}>ANIMATION</h5>
                  <h3 className={['u-mb-small', classes['article__title']].join(' ')}>
                    Show and Tell: Video Content As a Part of User Experience
                  </h3>
                  <p className={classes['article__content']}>
                    Check how videos can be used as a part of a user interface, what types and
                    design practices are popular, and how video content enhances UX design for web
                    and mobile.
                  </p>
                </article>
              </div>
              {blogs.map(({ id, title, image, category }) => (
                <div key={id}>
                  <Image src={`${baseURL}${image[0].url}`} alt={title} width={213} height={213} />
                  <h5>{category.name}</h5>
                  <h4>{title}</h4>
                </div>
              ))}
            </div>
          </section>

          <section className={['u-mb-xlarge', classes.popular].join(' ')}>
            <div className="row-between-centered u-mb-medium">
              <h1 className={classes.heading}>Popular</h1>
            </div>

            <div className={classes.popular__grid}>
              {blogs.map(({ id, title, content, image, category }) => (
                <FlatCard
                  key={id}
                  title={title}
                  category={category.name}
                  content={content}
                  image={`${baseURL}${image[0].url}`}
                  href={`/posts/${id}`}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
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
