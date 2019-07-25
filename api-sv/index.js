const express = require('express')
const app = express()
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const { makeExecutableSchema } = require('graphql-tools')


const typeDefs = require('./typeSchema')
const resolvers = require('./resolvers')

const schema = makeExecutableSchema({
	typeDefs,
	resolvers
})

app.use(express.json())
app.use('/graphql', graphqlExpress({ schema }))
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

app.listen(8001, () => console.log('running'))