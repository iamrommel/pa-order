import { Migrations } from 'meteor/percolate:migrations'
import { TenantModel } from '../../../api/common/tenant/model'

Migrations.add({
  version: 1,
  name: 'Run the standing data',
  up: function () {
    //region login service configuration
    const loginServiceConfig = [
      {
        '_id': '3nSkMJ8hTD3wTojjD',
        'service': 'facebook',
        'appId': '483545702012114',
        'secret': '3e5644fb3874eebec8ddeda515a39b5c',
        'loginStyle': 'popup'
      },
      {
        '_id': 'Rv4CjATra3Phj3HiJ',
        'service': 'google',
        'clientId': '741004933388-u4ldc89qm82s086jtlno4himibcip6g8.apps.googleusercontent.com',
        'secret': 'fOmBAIIqD2C2nMYAr-7QYp-B',
        'loginStyle': 'popup'
      }
    ]
    const collection = ServiceConfiguration.configurations._collection
    collection.remove({})
    collection.rawCollection().insertMany(loginServiceConfig)
    //endregion

    //region Tenant standing data
    const tenantModel = new TenantModel()
    const tenants = [
      {
        '_id': 'kojGGyKFupyH3hAdy',
        'code': 'DFT',
        'name': 'Default Tenant'
      },
      {
        '_id': 'werGGyKFupyH3h1dW',
        'code': 'ILY',
        'name': 'i lab Yo'
      }]
    tenantModel.collection.rawCollection().remove({})
    tenantModel.collection.rawCollection().insertMany(tenants)

    //endregion
  }
})

