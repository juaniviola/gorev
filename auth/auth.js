const jwt = require('jsonwebtoken')
require('dotenv').config()
const config = {
  privateKey: process.env.PRIVATE_KEY
}

module.exports = (req, res, next) => {
  const token = req.headers['x-access-token'] || req.headers['authorization']

  if (!token) return res.status(401).send('Access denied')

  try {
    const decoded = jwt.verify(token, config.privateKey)
    req.user = decoded
    next()
  } catch(err) {
    res.status(400).send('invalid token')
  }
}
