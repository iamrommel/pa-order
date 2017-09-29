import { Utils } from 'pcmli.umbrella.uni-core'
import { BaseController, BaseSubController, defaultConnection } from 'pcmli.umbrella.backend'
import { Schema } from 'mongoose'
import autoIncrement from 'mongoose-auto-increment'

import { ProductSchema } from '../product'
import { OrderStatusEnum } from './helper'

autoIncrement.initialize(defaultConnection(Meteor.settings))

const modelName = 'Order'
const OrderDetailSchema = new Schema({
  product: ProductSchema,
  quantity: Number,
  price: Number,
  total: Number
})
export const OrderSchema = new Schema({
  code: String,
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
OrderSchema.plugin(autoIncrement.plugin, {model: modelName, field: 'orderNumber'})

OrderSchema.pre('save', (next) => {

  //if undefine, empty, or null or auto, create the padded code
  if (this.code === '[auto]' || !this.code) {

  }

})

export class OrderController extends BaseController {
  constructor () {
    super({modelName, schema: OrderSchema, appSettings: Meteor.settings, children: ['details']})
  }
}



