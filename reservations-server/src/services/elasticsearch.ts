import { Client } from 'elasticsearch'

export const elasticClient = new Client({
  host: process.env.ELASTICSEARCH_HOST || 'localhost',
})

// ping the client to be sure Elasticsearch is up
elasticClient.ping(
  {
    requestTimeout: 30000,
  },
  function (error) {
    // at this point, elastic search is down, please check your Elasticsearch service
    if (error) {
      console.error('Elasticsearch cluster is down!')
    } else {
      console.log('Everything is ok')
    }
  }
)

elasticClient
  .search({
    index: 'books',
    type: 'book',
    body: {
      query: {
        multi_match: {
          query: 'express js',
          fields: ['title', 'description'],
        },
      },
    },
  })
  .then(
    function (response) {
      var hits = response.hits.hits
    },
    function (error) {
      console.trace(error.message)
    }
  )
