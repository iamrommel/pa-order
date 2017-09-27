import mongoose from 'mongoose'
import { Meteor } from 'meteor/meteor'

mongoose.Promise = global.Promise

function createConnection (name) {
  return mongoose.createConnection(Meteor.settings[name])
}


export const defaultConnection = createConnection('MONGO_URL')
export const on = createConnection
