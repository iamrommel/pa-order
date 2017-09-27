import { CommonModel } from 'pcmli.umbrella.backend'
import { Utils } from 'pcmli.umbrella.core'
import _ from 'lodash'

export class PickupModel extends CommonModel {

  constructor (modelName, collection, options = {}) {

    if (!collection) throw  new Error('MongoDB Collection object is required when creating PickupModel')

    super(modelName, collection, options)
    const {customerModel} = options
    this.customerModel = customerModel

  }

  preProcessDoc (doc) {
    //get the ticket summary
    if (doc.ticketNo && doc.timeStamp)
      doc.summary = `${doc.ticketNo || ''} - ${Utils.formatDateTime(doc.timeStamp)}`
    return doc
  }

  beforeCreate (doc) {

  }

  getTotalWeight ({details, weight, _id}) {

    let totalWeight = _.sumBy(details, 'weight')
    const item = _.find(details, {_id})

    //this is delete
    if (weight === null)
      return totalWeight - item.weight

    //this is insert
    if (_id === null)
      return totalWeight + weight

    //else the is update
    return totalWeight + ( weight - item.weight  )
  }

  async getCustomerSyncInfoAsync (_id) {
    return await this.customerModel.getRepository().findOne({_id}, {'_syncInfo.externalId': 1})
  }

  async buildDeliveryCustomerSyncInfoAsync (doc) {
    //for push of delivery
    //if the push of deliveries has customer then get it's syncInfo
    let customerId
    //if there is a push on deliveries
    if (_.get(doc, `$push.deliveries`)) {
      customerId = _.get(doc, `$push.deliveries.customer._id`)
      //get this customer from the model
      const customer = await this.getCustomerSyncInfoAsync(customerId)
      _.merge(doc, {$push: {deliveries: {customer}}})
    }

    //if there is an update for deliveries
    customerId = doc && doc.$set && doc.$set['deliveries.$.customer._id']
    if (customerId) {
      const customer = await this.getCustomerSyncInfoAsync(customerId)
      doc.$set['deliveries.$.customer._syncInfo.externalId'] = _.get(customer, '_syncInfo.externalId')
    }
  }

  async buildDetailCustomerSyncInfoAsync (doc) {
    //for push of delivery
    //if the push of deliveries has customer then get it's syncInfo
    let customerId
    //if there is a push on details
    if (_.get(doc, `$push.details`)) {
      customerId = _.get(doc, `$push.details.customer._id`)
      //get this customer from the model
      const customer = await this.getCustomerSyncInfoAsync(customerId)
      _.merge(doc, {$push: {details: {customer}}})
    }

    //if there is an update for deliveries
    customerId = doc && doc.$set && doc.$set['details.$.customer._id']
    if (customerId) {
      const customer = await this.getCustomerSyncInfoAsync(customerId)
      doc.$set['details.$.customer._syncInfo.externalId'] = _.get(customer, '_syncInfo.externalId')
    }
  }

  //TODO: This should consider also the weight for insert operation
  async buildPickupWeightAsync (doc, args) {

    let {_id, filter} = args
    filter = Utils.filterToObject(filter || '')
    let detailId = filter && filter['details._id']

    //get the weight from the database, if there is a push/inserting into on details
    let weight, totalWeight

    const pickup = await this.getRepository().findOne({_id}, {details: 1})
    const {details = []} = pickup || {}

    const mergeTotalWeight = () => {
      totalWeight = this.getTotalWeight({details, _id: detailId, weight})
      _.merge(doc, {$set: {totalWeight}})
    }

    if (_.get(doc, `$push.details`)) {
      //insert of pickup details
      //get the totalWeights
      weight = _.get(doc, '$push.details.weight', 0)
      detailId = null
      mergeTotalWeight()
    }
    else if (doc && doc.$set && doc.$set['details.$.customer._id']) {
      //this is update of pickup details
      weight = doc.$set['details.$.weight'] || 0

      mergeTotalWeight()
    }
    else if (_.get(doc, `$pull.details`)) {
      //get the weight from db
      weight = null
      mergeTotalWeight()
    }

  }

  async beforeUpdateAsync (doc, args) {

    //set value for summary
    const ticketNo = _.get(doc, '$set.ticketNo')
    const timeStamp = _.get(doc, '$set.timeStamp')
    if (ticketNo && timeStamp) {
      doc.$set.summary = `${ticketNo} - ${Utils.formatDateTime(timeStamp)}`
    }

    await this.buildDeliveryCustomerSyncInfoAsync(doc)
    await this.buildDetailCustomerSyncInfoAsync(doc)
    await this.buildPickupWeightAsync(doc, args)
  }

  async mutate ({args, context}) {

    let mutationCallback = async (docObj) => {

      const operationType = this.getOperationType(args)
      if (operationType === this.operationType.update) {
        await this.beforeUpdateAsync(docObj, args)
      }
      else {
        //create operation
        let doc = _.assign({}, docObj)
        this.preProcessDoc(doc)
        _.merge(docObj, doc)
      }
    }

    return await super.mutate({args, context, mutationCallback})
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
