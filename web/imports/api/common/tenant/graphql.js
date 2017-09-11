export const tenantMutationDef = `
  mutateTenants(_id: String!, doc: String, _type : String) : Tenant
  addTenantUser(doc: String!) : User 
`

export const tenantQueryDef = `
  allTenants(filter: String, options: String): [Tenant]

`

export const typeDefs = [`
type Tenant {
     _id : String
     code : String
     name : String
     users : [User]
}
`]

export const resolvers = {
  Query: {
    allTenants (root, args, context) {
      return context.TenantModel.find({args, context})
    },
  },
  Mutation: {
    async mutateTenants (root, args, context) {
      return await context.TenantModel.mutate(args)
    },
    async addTenantUser (root, args, context) {
      return await context.TenantModel.addUser({args, context})
    }
  },
  Tenant: {
    users (root = {}, args, context) {
      //if it got values from the root get it else take it from the database
      const {_id} = root
      args = Object.assign({}, args, {filter: {tenantId: _id}})

      //else just get from the db
      return context.UserModel.find({args, context})
    }
  }
}
