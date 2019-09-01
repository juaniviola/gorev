const { request } = require('graphql-request')
const uri = 'http://localhost:8001/graphql'

export default {
  getTasks (user) {
    const query = `
      query getTasks($user: userVerify) {
        getTasks(user: $user) {
          token,
          task {
            id,
            summary,
            creator,
            start,
            end
          }
        }
      }
    `
    const variables = { user }
    return request(uri, query, variables)
  }
}