import { Random } from 'meteor/random'
import _ from 'lodash'
import { setupParams } from '../common/graphql'

export const query = `
  allRoutes(filter: String, options: String): [Route]
`

export const mutation = `
  mutateRoutes(_id: String!, doc: String, _type : String, filter : String) : Route
`

export const typeDefs = [`

type RouteDetail {
    _id : String!   
    customer : Customer
    position : Int        
}

type Route {
    _id : String,
    code: String
    remarks: String
    status: String
    distance: Int
    tags : [String]
    details(start: Int, end : Int): [RouteDetail]
    _histories : [History]
}
 
`]

export const resolvers = {
  Query: {
    allRoutes (root, args, context) {
      return context.RouteModel.find({args, context})
    },
  },
  Route: {
    details (root, args) {
      let {details = []} = root
      let {start, end} = args
      start = start || 0
      end = end || details.length
      details = details.slice(start, end)

      return _.orderBy(details, ['position'], ['asc'])
    }
  },
  RouteDetail: {
    customer (routeDetail, args, context) {
      const filter = {_id: routeDetail.customerId}
      args = {...args, filter}
      return context.CustomerModel.findOne({args, context})
    }
  },
  Mutation: {
    mutateRoutes (root, args, context) {
      return context.RouteModel.mutate({args, context})
    },
  }
}
