/* eslint-disable react/prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import Layout from '../../components/layout/Layout'

const PortfolioPage = ({ portfolio }) => {
  const renderPortfolios = (portfolio) => {
    return portfolio.map((item) => item.title)
  }

  return (
    <Layout>
      <section>
        <ul>{renderPortfolios(portfolio)}</ul>
      </section>
    </Layout>
  )
}

PortfolioPage.prototype = {
  portfolio: PropTypes.array.isRequired
}

export const getStaticProps = () => {
  return {
    props: {
      portfolio: []
    }
  }
}

export default PortfolioPage
