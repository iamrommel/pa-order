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
let graphql = buildGraphql(controller, ['details'])

export { graphql }
