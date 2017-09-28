import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
import { Mongo } from 'meteor/mongo'
import GraphQLDate from 'graphql-date'
import _ from 'lodash'
import {
  historyTypeDef,
  addressTypeDef, AddressModel,
  contactTypeDef, ContactModel,
  imageTypeDef, ImageModel,
  userTypeDef, userQueryDef, userMutationTypeDef, userResolvers, UserModel,
  tenantTypeDef, tenantQueryDef, tenantMutationDef, tenantResolvers, TenantModel
} from 'pcmli.umbrella.backend'

//MOVE this common typeDef on umbrella.backend
import { typeDefs as syncInfoTypeDef } from './syncInfo/graphql'

export const commonTypeDef = [`
scalar Date

type PageInfo {
    count : Int
}
`,
  ...addressTypeDef,
  ...contactTypeDef,
  ...historyTypeDef,
  ...imageTypeDef,
  ...userTypeDef,
  ...tenantTypeDef,
  ...syncInfoTypeDef
]

export const commonQueryDef = `
  pageInfo(filter: String, type: String!) : PageInfo
  
  ${tenantQueryDef}
  ${userQueryDef}
`

export const commonMutationDef = `
  ${tenantMutationDef}
  ${userMutationTypeDef}
`

let commonResolvers = {
  Date: GraphQLDate,
  Query: {
    pageInfo (root, args = {}, context) {
      const {type} = args
      const count = context[type].count({args, context})

      return {count}
    }
  },

}

commonResolvers = _.merge({}, commonResolvers,
  tenantResolvers,
  userResolvers,
)

export { commonResolvers }

const addressModel = new AddressModel({googleApiKey: Meteor.settings.public.GOOGLE_API_KEY})
const contactModel = new ContactModel({addressModel})
export const tenantCollection = new Mongo.Collection('tenants')

export const commonContext = {
  TenantModel: new TenantModel({collection: tenantCollection}),
  UserModel: new UserModel({meteor: Meteor, accounts: Accounts}),
  ImageModel: new ImageModel(),
  AddressModel: addressModel,
  ContactModel: contactModel
}

export const buildGraphql = (controller) => {

  const modelName = controller.modelName
  const query = `all${modelName}(filter: String, options: String, projection : String): [${modelName}]`
  const mutation = `
  create${modelName}(input : String!) : ${modelName},
  update${modelName}(input : String!, filter: String) : ${modelName},
  delete${modelName}(filter: String) : ${modelName},
`

  const resolvers = {
    Query: {
      async [`all${modelName}`] (root, args, context) {
        return await controller.getAll(args, context, root)
      },
    },
    Mutation: {

      async [`create${modelName}`] (root, args, context) {
        return await controller.create(args)
      },
      async [`update${modelName}`] (root, args, context) {
        return await controller.update(args, context, root)
      },
      async [`delete${modelName}`] (root, args, context) {
        return await controller.delete(args, context, root)
      }
    }
  }

  return {query, mutation, resolvers}

}
