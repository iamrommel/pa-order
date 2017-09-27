import _ from 'lodash'
import { createApolloServer } from 'meteor/apollo'
import { makeExecutableSchema } from 'graphql-tools'
import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

import { commonResolvers, commonTypeDef, commonMutationDef, commonQueryDef, commonContext } from '../../../../imports/api/common/graphql'

//import the models because they are the context
import { CustomerModel, customerCollection, customerModelName, customerMutation, customerQuery, customerResolver, customerTypeDef } from '../../../api/customer/'
import { RouteModel, routeCollection, routeModelName, routeMutation, routeQuery, routeResolver, routeTypeDef } from '../../../api/route/'
import { PickupModel, pickupCollection, pickupModelName, pickupMutation, pickupQuery, pickupResolver, pickupTypeDef } from '../../../api/milk/pickup'
import { DriverModel, driverCollection, driverModelName, driverMutation, driverQuery, driverResolver, driverTypeDef } from '../../../api/driver'

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

const meteorObjects = {
  meteor: Meteor,
  accounts: Accounts
}
const customerModel = new CustomerModel(customerModelName, customerCollection, meteorObjects)
const pickupModel = new PickupModel(pickupModelName, pickupCollection, {...meteorObjects, customerModel})

const context = {
  ...commonContext,
  PickupModel: pickupModel,
  CustomerModel: customerModel,
  RouteModel: new RouteModel(routeModelName, routeCollection, meteorObjects),
  DriverModel: new DriverModel(driverModelName, driverCollection, meteorObjects),
}

createApolloServer({
  schema,
  context
})
