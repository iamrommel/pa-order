import mongoose from 'mongoose'
import { Meteor } from 'meteor/meteor'
import bluebird from 'bluebird'

const connect = () => {
  const options = {
    keepAlive: 120,
    promiseLibrary: bluebird,
    useMongoClient: true
  }
  mongoose.Promise = bluebird
  mongoose.connect(Meteor.settings.MONGO_URL, options)
}

//starts connecting
connect()

// Error handler
mongoose.connection.on('error', function (err) {
  console.error('✗ MongoDB Connection Error. Please make sure MongoDB is running. -> ' + err)
})

// Reconnect when closed
mongoose.connection.on('disconnected', function () {
  connect()
})