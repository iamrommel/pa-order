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

  create = async ({input}) => {
    return await ProductModel.create(input)
  }

  getAll = async ({filter, options, projection}) => {
    filter = Utils.filterToObject(filter)
    options = Utils.optionsToObject(options)
    options = {lean: true, ...options}
    return await ProductModel.find(filter, projection, options).exec()
  }

  update = async ({input, filter}) => {
    const options = {
      'new': true,
      upsert: true,
      runValidators: true,
      setDefaultsOnInsert: true
    }
    let condition = {_id: input._id}
    if (filter)
      condition = Utils.filterToObject(filter)

    return await ProductModel.findOneAndUpdate(condition, input, options)
  }

  delete = async ({filter}) => {
    filter = Utils.filterToObject(filter)
    return await ProductModel.findOneAndRemove(filter)

  }

}
