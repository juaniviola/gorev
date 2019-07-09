'use strict'

const rp = require('request-promise-native')

const req = async () => {
  const options = {
    method: 'GET',
    uri: 'https://www.google.com',
    resolveWithFullResponse: true
  }

  const html = await rp(options)
  return html
}

test('status code', async () => {
  const re = await req()
  expect(re.statusCode).toBe(200)
})

test('test to sv', async () => {
  const options = {
    method: 'GET',
    uri: 'http://localhost:8000/api/users/test'
  }

  const result = await rp(options)
  expect(result).toBe('test passed')
})