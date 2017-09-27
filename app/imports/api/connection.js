import mongoose from 'mongoose'
import bluebird from 'bluebird'

//import { Meteor } from 'meteor/meteor'
import mockSettings from '../../settings-dev.json'

console.log(Meteor, 'Meteor on conenction')

let Meteor = Meteor || {settings: mockSettings}
mongoose.Promise = bluebird

function createConnection (name) {
  const options = {
    keepAlive: 120,
    promiseLibrary: bluebird,
    useMongoClient: true
  }
  const connectionString = Meteor.settings[name]
  return mongoose.createConnection(connectionString, options)
}

export const defaultConnection = createConnection('MONGO_URL')
export const on = createConnection
