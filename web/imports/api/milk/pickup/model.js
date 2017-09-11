import { CommonModel } from 'pcmli.umbrella.backend'
import { Mongo } from 'meteor/mongo'
import { Utils } from 'pcmli.umbrella.core'
import _ from 'lodash'

const modelName = 'milkpickups'
const collection = new Mongo.Collection(modelName)

export class PickupModel extends CommonModel {

  constructor () {
    super(modelName, collection)
  }

  preProcessDoc (doc) {
    doc.summary = `${doc.ticketNo || ''} - ${Utils.formatDateTime(doc.timeStamp)}`

    //get the totalWeight

    return doc
  }

  async mutate ({args, context}) {
    let mutationCallback = async (docObj) => {

      const operationType = this.getOperationType(args)
      //no need to do this if the operation type is delete
      if (operationType === this.operationType.delete) return

      if (operationType === this.operationType.update) {
        //update operation
        let doc = _.get(docObj, ['$set'], {})
        this.preProcessDoc(doc)
        _.merge(docObj, {$set: doc})
      }
      else {
        //create operation
        let doc = docObj
        this.preProcessDoc(doc)
        _.merge(docObj, doc)
      }
    }

    return await super.mutate({args, context})
  }

  static createDefault (newValue) {

    const defaultValue = {
      '_id': Utils.generateId(17),
      ticketNo: Utils.generateId(5),
      timeStamp: new Date().toISOString()
    }

    return Object.assign({}, defaultValue, newValue)

  }
}
