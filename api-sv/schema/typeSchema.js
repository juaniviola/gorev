const typeDefs = `
	type User {
		_id: String,
		username: String,
		token: String
	}

  scalar Creator
  scalar Time

	type Task {
		id: String,
		creator: Creator,
		summary: Creator,
		start: Time,
    end: Time
	}

	input userCreate {
		username: String,
		password: String
	}

	input userLogin {
		username: String,
		password: String
	}

	input userVerify {
		username: String,
		token: String
	}

	type Query {
		verifyUser(user: userVerify): User,
		loginUser(user: userLogin): User,
		getTasks(user: userVerify): [Task]
	}

	type Mutation {
		createUser(user: userCreate): User
	}
`

module.exports = typeDefs