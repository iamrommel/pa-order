import { loginWithAccessTokenAndEmail, logoutWithAccessTokenAndEmail } from '../../../../imports/startup/server/config/accounts-base'

export const userMutationTypeDef = `
  loginWithAccessTokenAndEmail(accessToken: String!, email : String!) : User
  logoutWithAccessTokenAndEmail(accessToken: String!, email : String!) : User
  mutateUsers(_id: String!, doc: String, _type : String) : User
`

export const userQueryDef = `
  allUsers(filter: String, options: String): [User]
`

export const typeDefs = [`
type Auth {
    token : String
    when : Date
}

type UserProfile {
    name : String
    picture : String
    email : String
}

type User {
     _id : String
    tenantId : String
    profile : UserProfile
    status : String
    auth : Auth
}
`]

export const resolvers = {
  Query: {
    async allUsers (root, args, context) {
      return await context.UserModel.find({args, context})
    },
  },
  Mutation: {
    mutateUsers (root, args, context) {
      return context.UserModel.mutate({args, context})
    },
    async loginWithAccessTokenAndEmail (root, args = {}, context) {
      return loginWithAccessTokenAndEmail(args)
    },
    async logoutWithAccessTokenAndEmail (root, args, context) {
      return logoutWithAccessTokenAndEmail(args)
    }

  }
}
