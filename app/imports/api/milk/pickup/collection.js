import { Mongo } from 'meteor/mongo'

export const modelName = 'milkpickups'
export const collection = new Mongo.Collection(modelName)
