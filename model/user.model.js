'use strict'

require('dotenv').config()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const config = {
  privateKey: process.env.PRIVATE_KEY
}

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 6
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  tasks: {
    type: Array,
    default: []
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
})

UserSchema.methods.generateAuthToken = params => jwt.sign(params, config.privateKey)

const User = mongoose.model('User', UserSchema)
const cleanCollection = () => User.deleteMany({})
const validateUser = (user) => {
  if ((!user.username || user.username.length < 5) || (!user.password || user.password.length < 8)) return false

  return true
}

module.exports = {
  User,
  validateUser,
  cleanCollection
}