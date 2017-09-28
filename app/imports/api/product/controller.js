import { Utils } from 'pcmli.umbrella.core'
import { Schema } from 'mongoose'
import { BaseController } from 'pcmli.umbrella.backend'

const modelName = 'Product'
const ProductStatusEnum = ['ACTIVE', 'IN_ACTIVE']
export const ProductSchema = new Schema({
  code: String,
  status: {
    type: String,
    enum: ProductStatusEnum,
    default: ProductStatusEnum[0]
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

export class ProductController extends BaseController {

  constructor () {
    super({modelName, schema: ProductSchema, appSettings: Meteor.settings})
  }

}
