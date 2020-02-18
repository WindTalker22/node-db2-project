const express = require('express')

const inventoryRouter = require('./routes/inventory-router')

const server = express()

server.use(express.json())

server.use('/api/inventory', inventoryRouter)

server.get('/', (req, res) => {
  res.send('Hello from the Server')
})

module.exports = server
