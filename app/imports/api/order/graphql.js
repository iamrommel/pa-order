import _ from 'lodash'
import { buildGraphql } from '../common'
import { OrderController } from './controller'

export const OrderTypeDefs = [`
type OrderDetail {
  _id : String
  product : Product
  quantity : Float
  price : Float
  total : Float
}

type Order {
    _id : String
    code: String
    status: String
    tags : [String]
    remarks : String
    timeStamp : Date
    grossAmount : Float
    discountAmount : Float
    netAmount : Float
    details : [OrderDetail]
} 
    
 `]

const controller = new OrderController()
let graphql = buildGraphql(controller)

//merge the create of details
const mutation = `
  ${graphql.mutation},
  create_details(input : String!, filter: String) : Order,
  delete_details(filter: String) : Order,
  update_details(input : String!, filter: String) : Order,
`

const resolvers = {
  Mutation: {
    async [`create_details`] (root, args, context) {
      return await controller.detailController.create(args)
    },
    async [`delete_details`] (root, args, context) {
      return await controller.detailController.delete(args)
    },
    async [`update_details`] (root, args, context) {
      return await controller.detailController.update(args)
    },
  }
}

graphql = _.merge(graphql, {mutation}, {resolvers})

export { graphql }
