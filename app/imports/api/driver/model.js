import { CommonModel, ImageModel, ContactModel } from 'pcmli.umbrella.backend'
import { Utils } from 'pcmli.umbrella.core'
import _ from 'lodash'

export class DriverModel extends CommonModel {

  constructor (modelName, collection, options={}) {

    if (!collection) throw  new Error('MongoDB Collection object is required when creating CustomerModel')

    super(modelName, collection, options)

    const {imageModel} = options
    this.imageModel = imageModel || ImageModel

  }

  mutationCallback = (args, context) => {

    return async (docObj) => {

      const operationType = this.getOperationType(args)


      //get the doc value from the docObj or from set
      let doc = _.get(docObj, '$set', docObj)


      if (operationType === this.operationType.create) {
        ///during create operation only the logo will be set for default
        doc.logo = this.imageModel.setDefaultLogo(doc.logo)
      }

      //setup the address
      await context.ContactModel.setupContactAddressGps(doc)

      //update the doc obj based on the operation type
      docObj = (operationType === this.operationType.create) ? _.merge(docObj, doc) : _.merge(docObj, {$set: doc})

    }

  }


  async mutate ({args, context}) {
    return await super.mutate({args, context, mutationCallback: this.mutationCallback(args, context)  })
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
