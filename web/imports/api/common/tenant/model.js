import { CommonModel } from 'pcmli.umbrella.backend'
import { Utils, ErrorUtil } from 'pcmli.umbrella.core'
import { Mongo } from 'meteor/mongo'

const modelName = 'tenants'
const collection = new Mongo.Collection(modelName)

export class TenantModel extends CommonModel {
  constructor () {
    const options = {noTenancy: true, noHistory: true}
    super(modelName, collection, options)
  }

  addUser = async ({args = {}, context = {}}) => {
    const {user = {}} = context
    let {doc} = args
    doc = Utils.jsonTryParse(doc)
    const {code} = doc

    //look for the tenantId using this cod
    const tenant = await this.findOne({args: {filter: {code}, options: {fields: {_id: -1}}}})

    const errorUtil = new ErrorUtil()
    if (!tenant) {
      errorUtil.addValidationError({code: 'The specified code does not exists.'})
      throw new Error(errorUtil.getErrorsAsString())
    }

    if (!user || !user._id) {
      errorUtil.addValidationError({code: 'The specified user does not exists.'})
      throw new Error(errorUtil.getErrorsAsString())
    }

    //update the user model for tenant id and set the status as active
    doc = {tenantId: tenant._id}
    const result = context.UserModel.collection.update({_id: user._id}, {$set: doc})

    //send the notification email about the registration on the admin

    return result

  }
}
