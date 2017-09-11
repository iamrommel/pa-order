import { Mongo } from 'meteor/mongo'
import { Utils } from 'pcmli.umbrella.core'
import { CommonModel, ContactModel, ImageModel } from 'pcmli.umbrella.backend'
import { Meteor } from 'meteor/meteor'
import _ from 'lodash'


const modelName = 'customers'
const collection = new Mongo.Collection(modelName)

export class CustomerModel extends CommonModel {

  constructor () {
    super(modelName, collection, {meteor: Meteor})
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
      await  context.ContactModel.setupContactAddressGps(doc)

      //update the doc obj based on the operation type
      docObj = (operationType === this.operationType.create) ? _.merge(docObj, doc) : _.merge(docObj, {$set: doc})

    }

    return await super.mutate({args, context, mutationCallback})

  }

  static type = {
    milkProducer: 'Milk Producer',
    grainProducer: 'Grain Producer',
    plant: 'Plant',

  }

  static status = {
    active: 'Active',
    inActive: 'In Active',
  }

  static createDefault () {

    const code = Utils.generateId(7)

    return {
      '_id': Utils.generateId(17),
      'summary': `${code} - [TODO] Customer Name`,
      'code': `${code}`,
      'name': '[TODO] Customer Name',
      'title': 'Owner, [TODO] XYZ Company',
      'type': CustomerModel.type.milkProducer,
      'contact': ContactModel.createDefault(),
      'status': CustomerModel.status.active,
      'logo': ImageModel.setDefaultLogo(),
      'remarks': 'Newly created record!'
    }
  }

}
