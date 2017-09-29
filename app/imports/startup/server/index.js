import { Meteor } from 'meteor/meteor'
import './config/graphql'
import './config/routes'
import './config/cloudinary'
import './config/accounts-base'
import './config/accountsMeld'
import './data/standing'


//this will auto publish information additional information about the user
Meteor.publish(null, function () {
  return Meteor.users.find({_id: this.userId}, {fields: {tenantId: 1, status: 1}})
})

Meteor.startup(() => {

  //do the migration
  Migrations.migrateTo('latest')
})

