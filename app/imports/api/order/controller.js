import { Utils } from 'pcmli.umbrella.core'
import { Schema } from 'mongoose'
import { BaseController } from '../common'

const OrderStatusEnum = ['NEW', 'PROCESSING', 'PAID']
const modelName = 'Order'

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
  grossAmount: Number,
  discountAmount: Number,
  netAmount: Number,
  preparedBy: String //TODO: this should be a sub document of user
})

export class OrderController extends BaseController {
  constructor () {
    super({modelName, schema: OrderSchema})
  }
}
