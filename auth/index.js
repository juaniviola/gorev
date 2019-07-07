'use strict'

const auth = require('./auth')
const { User, validateUser } = require('../model/user.model')
const { hashSync, compareSync, genSaltSync } = require('bcryptjs')
const express = require('express')
const router = express.Router()

router.post('/signin', async (req, res) => {
  const validate = validateUser(req.body)
  if (!validate) return res.status(400).send('Incorrect response')

  let user = await User.findOne({ username: req.body.username })
  if (user) return res.status(400).send('User already exist')

  const { username, password } = req.body
  user = new User({
    username,
    password: hashSync(password, genSaltSync(10))
  })
  await user.save()

  const token = user.generateAuthToken()
  res.header('x-auth-token', token).send({
    _id: user._id,
    username: user.username
  })
})

router.post('/login', async (req, res) => {
  const validate = validateUser(req.body)
  if (!validate) return res.status(400).send('Incorrect response')

  let user = await User.findOne({ username: req.body.username })
  if (!user) return res.status(400).send('User no exists')

  const { username, password } = req.body
  comparePass = compareSync(password, genSaltSync(10))
  if (username != user.username || !comparePass) return res.status(400).send('Invalid credentials')

  const token = user.generateAuthToken()
  res.header('x-auth-token', token).send({
    _id: user._id,
    username: user.username
  })
})

router.post('/', auth, async (req, res) => {
  let user = await User.findById(req.user.username)
  if (!user) return res.status(400).send('User already exist')

  const token = user.generateAuthToken()
  res.header('x-auth-token', token).send({
    _id: user._id,
    username: user.username
  })
})

module.exports = {
  routerApi: router
}