import { CommonModel, ContactModel, ImageModel } from 'pcmli.umbrella.backend'
import { Mongo } from 'meteor/mongo'
import {Utils} from 'pcmli.umbrella.core'
import _ from 'lodash'

const modelName = 'drivers'
const collection = new Mongo.Collection(modelName)

export class DriverModel extends CommonModel {

  constructor () {
    super(modelName, collection)
  }

  async mutate ({args, context}) {

    let mutationCallback = async (docObj) => {

      const operationType = this.getOperationType(args)

      //no need to do this if the operation type is delete
      if (operationType === this.operationType.delete) return

      //get the doc value from the docObj or from set
      let doc = _.get(docObj, '$set', docObj)

      if (operationType === this.operationType.create) {
        ///during create operation only the logo will be set for default
        doc.logo = context.ImageModel.setDefaultLogo(doc.logo)
      }

      //setup the address
      await context.ContactModel.setupContactAddressGps(doc)

      //update the doc obj based on the operation type
      docObj = (operationType === this.operationType.create) ? _.merge(docObj, doc) : _.merge(docObj, {$set: doc})


    }

    return await super.mutate({args, context, mutationCallback})

  }

  static status = {
    active: 'Active',
    inActive: 'In Active',
  }

  static createDefault (newValue) {

    const code = `${Utils.generateId()}@mailinator.com`
    const defaultValue = {
      '_id': Utils.generateId(17),
      code,
      'name': '[TODO] Driver Name',
      'contact': ContactModel.createDefault({email: code}),
      'status': DriverModel.status.active,
      'logo': ImageModel.setDefaultLogo(),
      'remarks': 'Newly created record!',
      'tags': ['new']
    }

    return Object.assign({}, defaultValue, newValue)

  }

}
