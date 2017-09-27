import _ from 'lodash'

export const query = `
  allPickups(filter: String, options: String): [Pickup]
`

export const mutation = `
  mutatePickups(_id: String!, doc: String, _type : String, filter : String) : Pickup
  mutatePickupDelivery(_id: String!, doc: String, _type : String) : PickupDelivery
  mutatePickupDetail(_id: String!, doc: String, _type : String) : PickupDetail

`

export const typeDefs = [`


type PickupDelivery {
    _id : String!
    customer : Customer
    weight: Int
    timeStamp :  Date
}

type PickupDetail {
    _id : String!   
    customer : Customer
    code : String
    gradeType : String
    weight: Int
    timeStamp :  Date
    gaugeRod : Int
    temperature : Int
    remarks : String
}

type Pickup {
    _id : String
    summary : String
    route : Route
    ticketNo : String
    timeStamp : Date
    totalWeight : Int
    startingWeight: Int
    details(start: Int, end : Int) : [PickupDetail]
    deliveries(start: Int, end : Int) : [PickupDelivery]
    _histories : [History]
    syncInfo : SyncInfo

}

`]

export const resolvers = {
  Query: {
    async allPickups (root, args, context) {
      return await context.PickupModel.find({args, context})
    },
  },
  Pickup: {
    route (root, args, context) {
      const _id = _.get(root, 'route._id')
      const filter = {_id}
      args = {...args, filter}
      return context.RouteModel.findOne({args, context})
    },
    details (root, args) {
      const {details = []} = root
      let {start, end} = args
      start = start || 0
      end = end || details.length
      return details.slice(start, end)
    },
    deliveries (root, args) {
      let {start, end} = args
      const {deliveries = []} = root

      start = start || 0
      end = end || deliveries.length
      return deliveries.slice(start, end)
    },
  },
  PickupDetail: {
    customer (root, args, context) {
      const _id = _.get(root, 'customer._id')
      const filter = {_id}
      args = {...args, filter}
      return context.CustomerModel.findOne({args, context})
    }
  },
  PickupDelivery: {
    customer (root, args, context) {
      const _id = _.get(root, 'customer._id')
      const filter = {_id}
      args = {...args, filter}
      return context.CustomerModel.findOne({args, context})
    }
  },
  Mutation: {

    mutatePickups (root, args, context) {
      return context.PickupModel.mutate({args, context})
    },
    async mutatePickupDelivery (root, args, context) {
      return await context.PickupModel.mutatePickupDelivery({root, args, context})
    },
    async mutatePickupDetail (root, args, context) {
      return await context.PickupModel.mutatePickupDetail({root, args, context})
    }
  }

}
