// const items = [
//   {
//     id: 3,
//     orgId: 2,
//     mod: 'toyota',
//     part: 'wheel',
//     price: 333,
//   },
//   {
//     id: 4,
//     orgId: 2,
//     mod: 'toyota',
//     part: 'shell',
//     price: 350,
//   },
//   {
//     id: 9,
//     orgId: 2,
//     mod: 'honda',
//     part: 'wheel',
//     price: 222,
//   },
//   {
//     id: 10,
//     orgId: 2,
//     mod: 'honda',
//     part: 'shell',
//     price: 250,
//   },
// ]

// const transformedItems = items.reduce((acc, item) => {
//   acc[item.mod] = { ...acc[item.mod], [item.part]: item.price }
//   return acc
// }, {})

// console.log(transformedItems)

// let array1 = [
//   { id: 120, name: 'Name of item' },
//   { id: 456, name: 'Other name' },
//   { id: 123, name: 'Other name' },
// ]

// let array2 = [123, 456]

// const arraysMatch = array2.every(array2Item => {
//   return array1.find(array1Object => array1Object.id === array2Item)
// })

// console.log(arraysMatch)

// const nacl = require('tweetnacl')
// const sodium = require('tweetsodium')
const fs = require('fs')
const path = require('path')

// const keyValueJSON = fs.readFileSync(path.join(__dirname, 'key-values.json'))
// JSON.parse(keyValueJSON).forEach(keyValue => {
//   // console.log(keyValue)
//   const key = keyValue.key
//   const value = keyValue.value

//   // Convert the message and key to Uint8Array's (Buffer implements that interface)
//   const messageBytes = Buffer.from(value)
//   const keyBytes = Buffer.from(key, 'utf16le')
//   const keyPair = nacl.box.keyPair()
//   // console.log(keyPair)
//   console.log(keyPair.publicKey)
//   console.log(keyBytes)

//   // Encrypt using LibSodium.
//   const encryptedBytes = sodium.seal(messageBytes, keyPair.publicKey)

//   // Base64 the encrypted secret
//   const encrypted = Buffer.from(encryptedBytes).toString('base64')

//   //console.log(value) + console.log(encrypted);
//   console.log(encrypted)
// })

// async function getData() {
//   const attendeesJSON = fs.readFileSync(path.join(__dirname, 'attendees.json'))
//   const attendees = JSON.parse(attendeesJSON)
//   console.log(attendees)
//   // let myData = await fetch('http://34.198.81.140/attendance.json')
//   //   .then(respose => {
//   //     return respose.json()
//   //   })
//   //   .then(data => {
//   //     return data
//   //   })
//   let startDate = 'Feb 1, 2020'
//   let endDate = 'Feb 29, 2020'
//   let result = myData.filter(data => {
//     return (
//       // Convert all date values to javascript dates using new Date(value)
//       // Get the number of milliseconds using getTime()
//       // Compare the milliseconds values
//       new Date(data.date).getTime() >= new Date(startDate).getTime() &&
//       new Date(data.date).getTime() <= new Date(endDate).getTime()
//     )
//   })
//   console.log(result)
// }
// getData()

// async function getData() {
//   const response = await fetch('http://34.198.81.140/attendance.json')
//   const myData = await response.json()

//   let startDate = 'Feb 1, 2020'
//   let endDate = 'Feb 29, 2020'
//   let result = myData.filter(data => {
//     return data.date >= startDate && data.date <= endDate
//   })
//   console.log(result)
// }
// getData()

const messages = [
  {
    sender: '1000000000',
    message: 'message 1',
  },
  {
    sender: '1000000000',
    message: 'message 2',
  },
  {
    sender: '1000000001',
    message: 'message 3',
  },
  {
    sender: '1000000002',
    message: 'message 4',
  },
  {
    sender: '1000000002',
    message: 'message 5',
  },
  {
    sender: '1000000002',
    message: 'message 6',
  },
]

const transformedMessages = messages.reduce((acc, message) => {
  acc.find(message => message)
  return acc
}, [])
