import { Mongo } from 'meteor/mongo'

export const modelName = 'drivers'
export const collection = new Mongo.Collection(modelName)
