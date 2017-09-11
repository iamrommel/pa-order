import _ from 'lodash'
import { createApolloServer } from 'meteor/apollo'
import { makeExecutableSchema } from 'graphql-tools'

import { commonResolvers, commonTypeDef, commonMutationDef, commonQueryDef, commonContext } from '../../../../imports/api/common/graphql'

import { resolvers as pickupResolver, typeDefs as pickupTypeDef, query as pickupQuery, mutation as pickupMutation } from '../../../api/milk/pickup/graphql'
import { resolvers as customerResolver, typeDefs as customerTypeDef, query as customerQuery, mutation as customerMutation } from '../../../api/customer/graphql'
import { resolvers as driverResolver, typeDefs as driverTypeDef, query as driverQuery, mutation as driverMutation } from '../../../api/driver/graphql'
import { resolvers as routeResolver, typeDefs as routeTypeDef, query as routeQuery, mutation as routeMutation } from '../../../api/route/graphql'

//import the models because they are the context
import { PickupModel } from '../../../api/milk/pickup/model'
import { RouteModel } from '../../../api/route/model'
import { CustomerModel } from '../../../api/customer/model'
import { DriverModel } from '../../../api/driver/model'

const queries = [`type Query {
  ${commonQueryDef}
  ${customerQuery}
  ${driverQuery}
  ${routeQuery}
  ${pickupQuery}
  
  
}`]

const mutations = [`type Mutation {
  ${commonMutationDef}
  ${customerMutation}
  ${driverMutation}
  ${routeMutation}
  ${pickupMutation}
}`
]

const typeDefs = [...commonTypeDef, ...queries, ...mutations, ...customerTypeDef, ...driverTypeDef, ...routeTypeDef, ...pickupTypeDef]
const resolvers = _.merge(commonResolvers, customerResolver, driverResolver, pickupResolver, routeResolver)

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

const context = {
  ...commonContext,
  PickupModel: new PickupModel(),
  RouteModel: new RouteModel(),
  CustomerModel: new CustomerModel(),
  DriverModel: new DriverModel(),
}

createApolloServer({
  schema,
  context
})
