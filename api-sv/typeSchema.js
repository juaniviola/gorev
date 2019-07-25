const typeDefs = `
	type Query {
		test: [Test]
	}

	type Test {
		uid: String,
		username: String,
		isAdmin: String
	}
`

module.exports = typeDefs