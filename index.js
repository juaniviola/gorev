'use strict'

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const authUsers = require('./auth/index')
require('dotenv').config()

const config = {
  privateKey: process.env.PRIVATE_KEY,
  mongoUrl: process.env.MONGO_URL,
  port: process.env.PORT
}

mongoose
  .connect(config.mongoUrl, { useNewUrlParser: true })
  .then(() => console.log('Connected to database'))
  .catch(err => console.error(`[ERROR]: ${err}`))

app.use(express.json())
app.use('api/users', authUsers.routerApi)

app.listen(config.port, () => console.log(`[App] listening on port ${config.port}`))
