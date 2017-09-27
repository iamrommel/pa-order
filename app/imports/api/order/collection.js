import { Mongo } from 'meteor/mongo'

export const modelName = 'orders'
export const collection = new Mongo.Collection(modelName)
