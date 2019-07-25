'use strict'

/*
______ _________________ _____ _____   ___ _____ ___________ 
|  _  \  ___| ___ \ ___ \  ___/  __ \ / _ \_   _|  ___|  _  \
| | | | |__ | |_/ / |_/ / |__ | /  \// /_\ \| | | |__ | | | |
| | | |  __||  __/|    /|  __|| |    |  _  || | |  __|| | | |
| |/ /| |___| |   | |\ \| |___| \__/\| | | || | | |___| |/ / 
|___/ \____/\_|   \_| \_\____/ \____/\_| |_/\_/ \____/|___/  
                                                              
*/

// const rp = require('request-promise')
const chalk = require('chalk')
const { MongoClient } = require('mongodb')
require('dotenv').config()
const config = {
	mongoUrl: process.env.MONGO_URL
}

describe('mock db', () => {
	let connection
	let db


	// clean db before
	beforeAll(async () => {
		connection = await MongoClient.connect(config.mongoUrl, {
			useNewUrlParser: true
		})
		db = await connection.db('gorev')
	})

	afterAll(async () => {
		await connection.close()
		await db.close()
	})

	// insert user
	test('create user', async () => {
		const users = db.collection('users')

		const mockUser = { 
			username: 'juaniviola', 
			password: 'password123',
			email: 'eljuani@gmail.com' 
		}
		await users.insertOne(mockUser)

		const inserted = await users.findOne({ email: 'eljuani@gmail.com' })
		expect(inserted.username).toEqual(mockUser.username)
	})
})
