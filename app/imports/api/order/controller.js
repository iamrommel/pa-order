import { Utils } from 'pcmli.umbrella.core'
import { Schema } from 'mongoose'
import { Model, BaseController } from '../common'

const OrderSchema = new Schema({
  code: String,
  status: String,
  quantity: Number,
  price: Number,
  total: Number
})

const modelName = 'Order'
const OrderStatus = ['NEW', 'PROCESSING', 'PAID']

export const OrderModel = new Model(modelName, {schema: OrderSchema})

export class OrderController extends BaseController {

  constructor () {
    super({model: OrderModel})
  }

}
