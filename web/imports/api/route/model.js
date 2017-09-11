import { CommonModel } from 'pcmli.umbrella.backend'
import { Mongo } from 'meteor/mongo'
import { Utils } from 'pcmli.umbrella.core'
import { Meteor } from 'meteor/meteor'

const modelName = 'routes'
const collection = new Mongo.Collection(modelName)

export class RouteModel extends CommonModel {

  constructor () {
    super(modelName, collection, {meteor: Meteor, noHistory: true})
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
