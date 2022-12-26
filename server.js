const express = require('express')
const bodyParser = require('body-parser')
const { client } = require('./db')
const router = require('./router/router')
require('dotenv').config()
const cors = require('cors')
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

async function run () {
  console.log(`datasource initialized`)
  app.use('/', router)
  app.listen(process.env.PORT, () => {
    console.log(`server is listining at ${process.env.PORT}`)
  })
}

run()
