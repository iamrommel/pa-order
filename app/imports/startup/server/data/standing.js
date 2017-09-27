import { Migrations } from 'meteor/percolate:migrations'
import { TenantModel } from 'pcmli.umbrella.backend'
import { Meteor } from 'meteor/meteor'
import { tenantCollection } from '../../../api/common/graphql'

Migrations.add({
  version: 1,
  name: 'Run the standing data',
  up: function () {
    //region login service configuration
    const loginServiceConfig = [
      {
        '_id': '3nSkMJ8hTD3wTojjD',
        'service': 'facebook',
        'appId': '388536118173525',
        'secret': 'd1245538417289b36dc568e880c1c2c5',
        'loginStyle': 'popup'
      },
      {
        '_id': 'Rv4CjATra3Phj3HiJ',
        'service': 'google',
        'clientId': '741004933388-fas0m0lp87lgc8l1unn7upmijc4q3tqt.apps.googleusercontent.com',
        'secret': 'hA5OfyyUrLJa3ygjqJWy4Pw3',
        'loginStyle': 'popup'
      }
    ]



    const collection = ServiceConfiguration.configurations._collection
    collection.remove({})
    collection.rawCollection().insertMany(loginServiceConfig)
    //endregion

    //region Tenant standing data
    const tenantModel = new TenantModel({collection: tenantCollection, meteor: Meteor})
    const tenants = [
      {
        '_id': 'kojGGyKFupyH3hAdy',
        'code': 'DFT',
        'name': 'Default Tenant'
      },
      {
        '_id': 'werGGyKFupyH3h1dW',
        'code': 'COS',
        'name': 'Chamber of Secrets'
      }]
    tenantModel.collection.rawCollection().remove({})
    tenantModel.collection.rawCollection().insertMany(tenants)

    //endregion
  }
})


