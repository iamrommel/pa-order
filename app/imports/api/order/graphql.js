export const query = `
  allOrders(filter: String, options: String): [Order]
`

export const mutation = `
  mutateOrders(_id: String!, doc: String, _type : String) : Order
`

export const typeDefs = [`
type OrderDetail {
  _id : String
  product : Product
  quantity : Float
  price : Float
  total : Float
}

type Order {
    _id : String,
    code: String
    status: String
    tags : [String]
    remarks : String
    _histories : [History],
}
`]

export const resolvers = {
  Query: {
    allOrders (root, args, context) {
      return context.OrderModel.find({args, context})
    },
  },
  Mutation: {
    mutateOrders (root, args, context) {
      return context.OrderModel.mutate({args, context})
    },
  }
}
