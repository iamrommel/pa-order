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
    _histories : [History]
}
input OrderInput {
    _id : String
    code: String
    status: String
    timeStamp : Date
    tags : [String]
    remarks : String
 }
    
 `]

const controller = new OrderController()
export const graphql = buildGraphql(controller)
