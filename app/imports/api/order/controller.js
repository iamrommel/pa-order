import _ from 'lodash'
import { Utils } from 'pcmli.umbrella.core'
import { Schema } from 'mongoose'
import { BaseController } from '../common'
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

export class BaseSubController {
  constructor ({model, childName}) {
    this.model = model
    this.childName = childName
  }

  create = async ({filter, input}) => {

    //parse the input
    input = Utils.jsonTryParse(input)
    filter = Utils.filterToObject(filter)

    //find first the parent document
    const parent = await this.model.findById(filter._id)

    //add the child to the parent
    parent[this.childName].push(input)

    //this will save the details
    return await parent.save()

  }

  delete = async ({filter}) => {
    //parse the input
    filter = Utils.filterToObject(filter)

    //find first the parent document
    const parent = await this.model.findById(filter._id)

    //if it cannot find the parent then throw error
    if (!parent) throw new Error('Cannot find the document to delete')

    //look for the child
    const child = parent[this.childName].id(filter[`${this.childName}._id`])

    //if it cannot find the child then throw error
    if (!child) throw new Error('Cannot find the sub-document to delete')

    //remove the details
    child.remove()

    //this will save the details too
    return await parent.save()
  }

  update = async ({filter, input}) => {

    //convert as object for the json string
    filter = Utils.filterToObject(filter)
    input = Utils.jsonTryParse(input)

    //find first the parent document
    const parent = await this.model.findById(filter._id)

    //if it cannot find the parent then throw error
    if (!parent) throw new Error('Cannot find the document to update')

    //look for the child
    const child = parent[this.childName].id(filter[`${this.childName}._id`])

    //if it cannot find the child then throw error
    if (!child) throw new Error('Cannot find the sub-document to update')

    //merge the child
    _.merge(child, input)

    //this will save the details too
    return await parent.save()
  }

}

export class OrderController extends BaseController {
  constructor () {
    super({modelName, schema: OrderSchema})

    this.detailController = new BaseSubController({model: this.model, childName: 'details'})
  }

  // ['create_details'] = async ({filter, input}) => {
  //
  //   //parse the input
  //   input = Utils.jsonTryParse(input)
  //   filter = Utils.filterToObject(filter)
  //
  //   //find first the parent document
  //   const parent = await this.model.findById(filter._id)
  //
  //   //add the child to the parent
  //   parent['details'].push(input)
  //
  //   //this will save the details
  //   return await parent.save()
  //
  // }
  //
  // ['delete_details'] = async ({filter}) => {
  //   //parse the input
  //   filter = Utils.filterToObject(filter)
  //
  //   //find first the parent document
  //   const parent = await this.model.findById(filter._id)
  //
  //   //if it cannot find the parent then throw error
  //   if (!parent) throw new Error('Cannot find the document to delete')
  //
  //   //look for the child
  //   const child = parent['details'].id(filter['details._id'])
  //
  //   //if it cannot find the child then throw error
  //   if (!child) throw new Error('Cannot find the sub-document to delete')
  //
  //   //remove the details
  //   child.remove()
  //
  //   //this will save the details too
  //   return await parent.save()
  // }
  //
  // ['update_details'] = async ({filter, input}) => {
  //
  //   //convert as object for the json string
  //   filter = Utils.filterToObject(filter)
  //   input = Utils.jsonTryParse(input)
  //
  //   //find first the parent document
  //   const parent = await this.model.findById(filter._id)
  //
  //   //if it cannot find the parent then throw error
  //   if (!parent) throw new Error('Cannot find the document to update')
  //
  //   //look for the child
  //   const child = parent['details'].id(filter['details._id'])
  //
  //   //if it cannot find the child then throw error
  //   if (!child) throw new Error('Cannot find the sub-document to update')
  //
  //   //merge the child
  //   _.merge(child, input)
  //
  //   //this will save the details too
  //   return await parent.save()
  // }

}
