import { CommonModel } from 'pcmli.umbrella.backend'
import { Utils } from 'pcmli.umbrella.core'

export class RouteModel extends CommonModel {

  constructor (modelName, collection, options) {

    if (!collection) throw  new Error('MongoDB Collection object is required when creating CustomerModel')

    super(modelName, collection, options)
  }

  static status = {
    active: 'Active',
    inActive: 'In Active',
  }

  static createDefault () {

    const code = Utils.generateId()

    return {
      '_id': Utils.generateId(17),
      'code': `${code}`,
      'remarks': 'NEW ROUTE, [TODO] ',
      tags: ['new-route'],
      status: RouteModel.status.active,
      'distance': 0,
    }
  }

}
