import { Utils } from 'pcmli.umbrella.core'
import { Schema } from 'mongoose'
import { Model, BaseController } from '../common'

const modelName = 'Product'
const productStatus = ['ACTIVE', 'IN_ACTIVE']
export const ProductSchema = new Schema({
  code: String,
  status: {
    type: String,
    enum: productStatus,
    default: productStatus[0]
  },
  name: {
    type: String,
    default: 'New Product'
  },
  remarks: {
    type: String,
  },
  tags: {
    type: [String],
    default: ['new']
  }
})

export const ProductModel = new Model(modelName, {schema: ProductSchema})

export class ProductController extends BaseController {

  constructor () {
    super({model: ProductModel})
  }

}
