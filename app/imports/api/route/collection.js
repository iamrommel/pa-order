import { Mongo } from 'meteor/mongo'

export const modelName = 'routes'
export const collection = new Mongo.Collection(modelName)
