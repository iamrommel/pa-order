import { Mongo } from 'meteor/mongo'

export const modelName = 'products'
export const collection = new Mongo.Collection(modelName)
