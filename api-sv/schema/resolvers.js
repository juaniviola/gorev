require('dotenv').config()
const rp = require('request-promise')
const config = {
	authSv: process.env.AUTH_SERVER
}

const resolvers = {
	Query: {
		loginUser: async (_, user) => {
			const data = await rp({
				uri: `${config.authSv}/api/users/login`,
				method: 'POST',
				body: user.user,
				json: true,
				resolveWithFullResponse: true
			})

			const res = data.body
			res.token = data.headers['x-auth-token']
			return res
		},

		verifyUser: async (_, user) => {
			const data = await rp({
				uri: `${config.authSv}/api/users/`,
				method: 'POST',
				body: {
					username: user.user.username
				},
				headers: {
					'x-access-token': user.user.token
				},
				json: true,
				resolveWithFullResponse: true
			})

			const res = data.body
			res.token = data.headers['x-auth-token']
			return res
		},

		getTasks: async (_, user) => {
			const { username, token } = user.user

			const verify = await rp({
				uri: `${config.authSv}/api/users/`,
				method: 'POST',
				body: { username },
				headers: { 'x-access-token': token },
				json: true,
				resolveWithFullResponse: true
			})

			const data = await getTask() // getTask es la funcion que retorna tareas
		}
	},

	Mutation: {
		createUser: async (_, user) => {
			const data = await rp({
				uri: `${config.authSv}/api/users/create`,
				method: 'POST',
				body: user.user,
				json: true,
				resolveWithFullResponse: true
			})

			const res = data.body
			res.token = data.headers['x-auth-token']
			return res
		}
	}
}

module.exports = resolvers