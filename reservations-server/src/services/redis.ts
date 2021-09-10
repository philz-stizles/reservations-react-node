import redis from 'redis'

const client = redis.createClient()

client.on('connect', function () {
  console.log('Redis Connected!')
})

client.on('error', function (err) {
  console.log('Redis Error ' + err)
})

// const REDIS_KEY = uuid.v4()

// app.get('/cache-in-hand', function (req, res) {
//   try {
//     client.get(REDIS_KEY, function (err, result) {
//       if (result) {
//         res.send(result)
//       } else {
//         axios
//           .get(config.API_URL + config.API_KEY)
//           .then(apiResult => {
//             const str = JSON.stringify(apiResult.data)
//             client.set(REDIS_KEY, str)
//             res.send(str)
//           })
//           .catch(err => {
//             console.error(err)
//           })
//       }
//     })
//   } catch (error) {
//     console.error(error)
//     res.send('Something went wrong!!!')
//   }
// })

// client.setex(searchTerm, 600, JSON.stringify(jobs.data))
// res.status(200).send({
//   jobs: jobs.data,
//   message: 'cache miss',
// })

// client.set('string key', 'string val', redis.print)
// client.hset('hash key', 'hashtest 1', 'some value', redis.print)
// client.hset(['hash key', 'hashtest 2', 'some other value'], redis.print)

// client.hkeys('hash key', function (err, replies) {
//   console.log(replies.length + ' replies:')

//   replies.forEach(function (reply, i) {
//     console.log('    ' + i + ': ' + reply)
//   })

//   client.quit()
// })
