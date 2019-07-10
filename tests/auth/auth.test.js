'use strict'

const rp = require('request-promise-native')

test('test to sv', async () => {
  const options = {
    method: 'GET',
    uri: 'http://localhost:8000/api/users/test'
  }

  const result = await rp(options)
  expect(result).toBe('test passed.')
})