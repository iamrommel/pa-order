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
        '_id': 'Rv4CjATra3Phj3HiJ',
        'service': 'google',
        'clientId': '419803053399-ios1qqd1gofaq5oe06phbshllvov2op2.apps.googleusercontent.com',
        'secret': 'fHGPHcbjtOhDYGU3ZOzz-CyX',
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
        'code': 'ILY',
        'name': 'I Lab Yo!'
      }]
    tenantModel.collection.rawCollection().remove({})
    tenantModel.collection.rawCollection().insertMany(tenants)

    //endregion
  }
})


