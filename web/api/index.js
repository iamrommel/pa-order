import {userTypeDef, userResolvers, userMutationTypeDef, userQueryDef} from 'pcmli.umbrella.backend'
import _ from 'lodash'
import { createApolloServer } from 'meteor/apollo'
import { makeExecutableSchema } from 'graphql-tools'




export const commonTypeDef = [`
scalar Date

type PageInfo {
    count : Int
}
`,
  ...userTypeDef,
]


const queries = [`type Query {
  ${commonQueryDef}
  
  
}`]

const mutations = [`type Mutation {
  ${commonMutationDef}
}`
]
