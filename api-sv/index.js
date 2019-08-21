const express = require('express')
const cors = require('cors')
const app = express()
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const { makeExecutableSchema } = require('graphql-tools')


const typeDefs = require('./schema/typeSchema')
const resolvers = require('./schema/resolvers')

const schema = makeExecutableSchema({
	typeDefs,
	resolvers
})

app.use(cors())
app.use(express.json())
app.use('/graphql', graphqlExpress({ schema }))
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

app.listen(8001, '0.0.0.0', () => console.log('running'))