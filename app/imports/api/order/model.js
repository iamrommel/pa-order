import { Utils } from 'pcmli.umbrella.core'
import _ from 'lodash'
import { Schema } from 'mongoose'

const orderSchema = new Schema({
  _id: String,
  code: String,
  status: String,
  quantity : Number,
  price : Number,
  total : Number
})

export class OrderModel {

  static status = {
    'new': 'New',
    'processing': 'Processing',
    'paid': 'Paid',
  }

}
