'use strict'

require('dotenv').config()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const config = {
  privateKey: process.env.PRIVATE_KEY
}

const TaskSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    minlength: 6
  },
  tasks: {
  	type: Array,
  	default: []
  }
})

const Task = mongoose.model('Task', TaskSchema)

module.exports = Task