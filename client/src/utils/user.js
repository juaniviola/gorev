const { request } = require('graphql-request')
const uri = 'http://localhost:8001/graphql'

export default {
  createUser (user) {
    const query = `
      mutation createUser($user: userCreate) {
        createUser(user: $user) {
          _id,
          username,
          token
        }
      }
    `
    const variables = { user }

    return request(uri, query, variables)
  },

  loginUser (user) {
    const query = `
      query login($user: userLogin) {
        loginUser(user: $user) {
          _id,
          username,
          token
        }
      }
    `
    const variables = { user }
    return request(uri, query, variables)
  },

  verifyUser (user) {
    const query = `
      query verify($user: userVerify) {
        verifyUser(user: $user) {
          _id,
          username,
          token
        }
      }
    `
    const variables = { user }
    return request(uri, query, variables)
  }
}