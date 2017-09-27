import { Utils } from 'pcmli.umbrella.core'
import { Schema } from 'mongoose'
import { Model } from '../model'

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

export const ProductModel = new Model(modelName, {schema: ProductSchema})

export class ProductController {

  create = (document) => {
    ProductModel.create(document)
  }

}
