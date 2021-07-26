require('dotenv').config()

const { hash } = require('./api/secure')
const server = require('./api/server')

const port = process.env.PORT

server.listen(port, () => {
  console.log('listening on ' + port)
})

const pass = hash('thisismy password');

console.log(pass)
console.log(pass.length)
