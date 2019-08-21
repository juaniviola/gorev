'use strict'

const auth = require('./auth')
const { User, validateUser, generateAuthToken } = require('../model/user.model')
const { hashSync, compareSync } = require('bcryptjs')
const express = require('express')
const router = express.Router()
require('dotenv').config()
const config = {
  dev: process.env.DEV
}

// /api/users/create -> username, password
router.post('/create', async (req, res) => {
  const validate = validateUser(req.body)
  if (!validate) return res.status(400).send('Incorrect response')

  let user = await User.findOne({ username: req.body.username })
  if (user) return res.status(400).send('User already exist')

  const { username, password } = req.body
  user = new User({
    username,
    password: hashSync(password, 10)
  })
  await user.save()

  const params = {
  	_id: user._id,
  	username: user.username,
    created: Date.now(),
    exp: Math.floor(Date.now() / 1000) + (60 * 60)
  }

  const token = generateAuthToken(params)
  const update = await User.updateOne({ _id: user._id }, { $set: { token } })
  res.header('x-auth-token', token).send({
    _id: user._id,
    username: user.username
  })
})

// /api/users/login -> username, password
router.post('/login', async (req, res) => {
  const validate = validateUser(req.body)
  if (!validate) return res.status(400).send('Incorrect response')

  let user = await User.findOne({ username: req.body.username })
  if (!user || !user.username) return res.status(400).send('User no exists')

  const { username, password } = req.body
	const comparePass = compareSync(password, user.password)
  if (username != user.username || !comparePass) return res.status(400).send('Invalid credentials')

  const params = {
  	_id: user._id,
  	username: user.username,
    created: Date.now(),
    exp: Math.floor(Date.now() / 1000) + (60 * 60)
  }

  const token = generateAuthToken(params)
  const update = await User.updateOne({ _id: user._id }, { $set: { token } })
  res.header('x-auth-token', token).send({
    _id: user._id,
    username: user.username
  })
})

// /api/users/ -> username, (token)
router.post('/', auth, async (req, res) => {
	// console.log(req.user)
  let user = await User.findById(req.user._id)
  if (!user) return res.status(400).send('User no exist')

  if (user.token !== req.token) return res.status(400).send('invalid access')
  const params = {
  	_id: user._id,
  	username: user.username,
    created: Date.now(),
    exp: Math.floor(Date.now() / 1000) + (60 * 60)
  }

  const token = generateAuthToken(params)
  const update = await User.updateOne({ _id: user._id }, { $set: { token } })
  res.header('x-auth-token', token).send({
    _id: user._id,
    username: user.username
  })
})

module.exports = router