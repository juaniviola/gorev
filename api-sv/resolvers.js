require('dotenv').config()
const fetch = require('node-fetch')
const config = {
	authSv: process.env.AUTH_SERVER
}

const tests = [
	{uid: '1', username: 'juani', isAdmin: 'true'},
	{uid: '2', username: 'ignacio', isAdmin: 'false'},
	{uid: '3', username: 'viola', isAdmin: 'false'},
	{uid: '4', username: 'jorge', isAdmin: 'false'},
	{uid: '5', username: 'panda', isAdmin: 'false'}
]

const resolvers = {
	Query: {
		test: () => {
			return tests
		}
	}
}

module.exports = resolvers