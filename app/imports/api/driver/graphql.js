export const typeDefs = [`
type Driver {
    _id : String
    code: String
    name: String
    tags : [String]
    remarks: String
    status: String
    contact: Contact
    status: String
    logo : Image
    _histories : [History]

}
 
`]

export const query = `
  allDrivers(filter: String, options: String): [Driver]
`

export const mutation = `
  mutateDrivers(_id: String!, doc: String, _type : String) : Driver
`


export const resolvers = {
  Query: {
    allDrivers (root, args, context) {
      return context.DriverModel.find({args, context})
    },
  },
  Mutation: {
    mutateDrivers (root, args, context) {
      return context.DriverModel.mutate({args, context})
    },

  }
}
