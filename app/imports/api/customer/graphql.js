export const query = `
  allCustomers(filter: String, options: String): [Customer]
`

export const mutation = `
  mutateCustomers(_id: String!, doc: String, _type : String) : Customer
`

export const typeDefs = [`

type Customer {
    _id : String,
    summary: String
    code: String
    name: String
    title: String
    type: String
    status: String
    contact: Contact   
    logo : Image
    tags : [String]
    remarks : String
    _histories : [History], 
    _syncInfo : SyncInfo
}
 
`]

export const resolvers = {
  Query: {
    allCustomers (root, args, context) {
      return context.CustomerModel.find({args, context})
    },
  },
  Mutation: {
    mutateCustomers (root, args, context) {
      return context.CustomerModel.mutate({args, context})
    },
  }
}
