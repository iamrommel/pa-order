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

//TODO: setup your own API key
const addressModel = new AddressModel()
const contactModel = new ContactModel({addressModel})

//TODO: pass the collection itself
export const tenantCollection = new Mongo.Collection('tenants')
export const userCollection = new Mongo.Collection('users')

export const commonContext = {
  TenantModel: new TenantModel({collection: tenantCollection}),
  UserModel: new UserModel({meteor: {}, accounts: {}}),
  ImageModel: new ImageModel(),
  AddressModel: addressModel,
  ContactModel: contactModel
}