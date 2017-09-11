import { CommonModel } from 'pcmli.umbrella.backend'


export class UserModel extends CommonModel {
  constructor () {
    const options = {noTenancy: true, noHistory: true}
    super('users', Meteor.users, options)
  }




}
