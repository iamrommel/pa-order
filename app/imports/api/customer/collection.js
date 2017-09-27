import { Mongo } from 'meteor/mongo'

export const modelName = 'customers'
export const collection = new Mongo.Collection(modelName)
