import { Utils } from 'pcmli.umbrella.core'

export class BaseController {

  constructor ({model}) {
    this.model = model
  }

  create = async ({input}) => {
    return await this.model.create(input)
  }

  getAll = async ({filter, options, projection}) => {
    filter = Utils.filterToObject(filter)
    options = Utils.optionsToObject(options)
    options = {lean: true, ...options}
    return await this.model.find(filter, projection, options).exec()
  }

  update = async ({input, filter}) => {
    const options = {
      'new': true,
      upsert: true,
      runValidators: true,
      setDefaultsOnInsert: true
    }
    let condition = {_id: input._id}
    if (filter)
      condition = Utils.filterToObject(filter)

    return await this.model.findOneAndUpdate(condition, input, options)
  }

  delete = async ({filter}) => {
    filter = Utils.filterToObject(filter)
    return await this.model.findOneAndRemove(filter)

  }


}