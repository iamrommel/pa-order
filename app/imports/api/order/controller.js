import { Utils } from 'pcmli.umbrella.core'
import { BaseController, BaseSubController } from 'pcmli.umbrella.backend'
import { Schema } from 'mongoose'
import { ProductSchema } from '../product'
import {OrderStatusEnum} from './helper'


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
    enum: Object.values(OrderStatusEnum),
    default: OrderStatusEnum.new
  },
  timeStamp: {
    type: Date,
    default: Date.now
  },
  remarks: String,
  tags: [String],
  grossAmount: Number,
  discountAmount: Number,
  netAmount: Number,
  preparedBy: String,
  details: [OrderDetailSchema]
})

export class OrderController extends BaseController {
  constructor () {
    super({modelName, schema: OrderSchema, appSettings: Meteor.settings})
    this.detailsController = new BaseSubController({model: this.model, childName: 'details'})

  }
}
