import { Utils } from 'pcmli.umbrella.core'
import { Schema } from 'mongoose'
import { BaseController, BaseSubController } from '../common'
import { ProductSchema } from '../product'

const OrderStatusEnum = ['NEW', 'PROCESSING', 'PAID']
const modelName = 'Order'

const OrderDetailSchema = new Schema({
  product: ProductSchema,
  quantity: Number,
  price: Number,
  total: Number
})

export const OrderSchema = new Schema({
  code: {
    type: String,
    default: () => Utils.generateId(6)
  },
  status: {
    type: String,
    enum: OrderStatusEnum,
    default: OrderStatusEnum[0]
  },
  timeStamp: {
    type: Date,
    default: Date.now
  },
  remarks: String,
  grossAmount: Number,
  discountAmount: Number,
  netAmount: Number,
  preparedBy: String,
  details: [OrderDetailSchema]
})

export class OrderController extends BaseController {
  constructor () {
    super({modelName, schema: OrderSchema})
    this.detailsController = new BaseSubController({model: this.model, childName: 'details'})

  }
}
