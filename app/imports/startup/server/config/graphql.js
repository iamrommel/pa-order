import _ from 'lodash'
import { createApolloServer } from 'meteor/apollo'
import { makeExecutableSchema } from 'graphql-tools'
import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

import { commonResolvers, commonTypeDef, commonMutationDef, commonQueryDef, commonContext } from '../../../../imports/api/common/graphql'

//import the models because they are the context
import { CustomerModel, customerCollection, customerModelName, customerMutation, customerQuery, customerResolver, customerTypeDef } from '../../../api/customer/'
import { ProductMutation, ProductQuery, ProductResolvers, ProductTypeDefs } from '../../../api/product/'

const queries = [`type Query {
  ${commonQueryDef}
  ${customerQuery}
  ${ProductQuery}
  
  
}`]

const mutations = [`type Mutation {
  ${commonMutationDef}
  ${customerMutation}
  ${ProductMutation}
}`
]

const typeDefs = [...commonTypeDef, ...queries, ...mutations, ...customerTypeDef, ...ProductTypeDefs]

const resolvers = _.merge(commonResolvers, customerResolver, ProductResolvers)

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

const meteorObjects = {
  meteor: Meteor,
  accounts: Accounts
}
const customerModel = new CustomerModel(customerModelName, customerCollection, meteorObjects)

const context = {
  ...commonContext,
  CustomerModel: customerModel,
}

createApolloServer({
  schema,
  context
})
