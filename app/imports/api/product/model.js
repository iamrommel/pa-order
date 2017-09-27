import { Utils } from 'pcmli.umbrella.core'
import mongoose, { Schema } from 'mongoose'

import {on} from '../connection'

const modelName = 'Product'
const productStatus = ['ACTIVE', 'IN_ACTIVE']
export const ProductSchema = new Schema({
  code: String,
  status: {
    type: String,
    enum: productStatus,
    default: productStatus[0]
  },
  name: String,
  remarks: String,
  tags: [String]
})

export const ProductModel = mongoose.model(modelName, ProductSchema)

export class ProductController {
  constructor () {

  }

}
