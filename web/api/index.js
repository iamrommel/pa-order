import _ from 'lodash'
import { makeExecutableSchema } from 'graphql-tools'
import bodyParser from 'body-parser'
import { graphqlExpress } from 'apollo-server-express'

import { commonResolvers, commonTypeDef, commonMutationDef, commonQueryDef, commonContext } from './graphql'

//import the models because they are the context

const queries = [`type Query {
  ${commonQueryDef}
}`]

const mutations = [`type Mutation {
  ${commonMutationDef}
}`
]

const typeDefs = [...commonTypeDef, ...queries, ...mutations]
const resolvers = _.merge(commonResolvers)

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

const context = {
  ...commonContext,
}

export const setupGraphql = ({app}) => {
  app.use('/graphql', bodyParser.json(), graphqlExpress({schema, context}))
}

