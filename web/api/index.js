import _ from 'lodash'
import { makeExecutableSchema } from 'graphql-tools'
import { commonResolvers, commonTypeDef, commonMutationDef, commonQueryDef, commonContext } from './graphql'

//import the models because they are the context

const queries = [`type Query {
  ${commonQueryDef}
}`]

const mutations = [`type Mutation {
  ${commonMutationDef}
}`
]

const typeDefs = [...commonTypeDef, ...queries, ...mutations ]
const resolvers = _.merge(commonResolvers)

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

const context = {
  ...commonContext,
}

createApolloServer({
  schema,
  context
})
