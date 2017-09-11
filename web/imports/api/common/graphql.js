import { Meteor } from 'meteor/meteor'
import GraphQLDate from 'graphql-date'
import _ from 'lodash'
import {
  historyTypeDef,
  addressTypeDef, AddressModel,
  contactTypeDef, ContactModel,
  imageTypeDef, ImageModel

} from 'pcmli.umbrella.backend'

//MOVE this common typeDef on umbrella.backend
import { typeDefs as externalTypeDef } from './external/graphql'

import { typeDefs as userTypeDef, userQueryDef, userMutationTypeDef, resolvers as userResolver } from './user/graphql'
import { typeDefs as tenantTypeDef, tenantQueryDef, tenantMutationDef, resolvers as tenantResolver } from './tenant/graphql'

import { TenantModel } from './tenant/model'
import { UserModel } from './user/model'

//TODO: Remove this not necessary
export const setupParams = ({args, context}) => {
  const {user} = context
  const params = {...args, _userContext: user}

  return params
}

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
  ...externalTypeDef
]

export const commonQueryDef = `
  pageInfo(filter: String, type: String!) : PageInfo

  ${tenantQueryDef}
  ${userQueryDef}
`

export const commonMutationDef = `
  ${userMutationTypeDef}
  ${tenantMutationDef}
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

commonResolvers = _.merge(commonResolvers, userResolver, tenantResolver)

export { commonResolvers }

const addressModel = new AddressModel({googleApiKey: Meteor.settings.public.GOOGLE_API_KEY})
const contactModel = new ContactModel({addressModel})

export const commonContext = {
  TenantModel: new TenantModel(),
  UserModel: new UserModel(),
  ImageModel: new ImageModel(),
  AddressModel: contactModel
}