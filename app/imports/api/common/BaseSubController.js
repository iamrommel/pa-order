import _ from 'lodash'
import { Utils } from 'pcmli.umbrella.core'

export class BaseSubController {
  constructor ({model, childName}) {
    this.model = model
    this.childName = childName
  }

  create = async ({filter, input}) => {

    //parse the input
    input = Utils.jsonTryParse(input)
    filter = Utils.filterToObject(filter)

    //find first the parent document
    const parent = await this.model.findById(filter._id)

    //add the child to the parent
    parent[this.childName].push(input)

    //this will save the details
    return await parent.save()

  }

  delete = async ({filter}) => {
    //parse the input
    filter = Utils.filterToObject(filter)

    //find first the parent document
    const parent = await this.model.findById(filter._id)

    //if it cannot find the parent then throw error
    if (!parent) throw new Error('Cannot find the document to delete')

    //look for the child
    const child = parent[this.childName].id(filter[`${this.childName}._id`])

    //if it cannot find the child then throw error
    if (!child) throw new Error('Cannot find the sub-document to delete')

    //remove the details
    child.remove()

    //this will save the details too
    return await parent.save()
  }

  update = async ({filter, input}) => {

    //convert as object for the json string
    filter = Utils.filterToObject(filter)
    input = Utils.jsonTryParse(input)

    //find first the parent document
    const parent = await this.model.findById(filter._id)

    //if it cannot find the parent then throw error
    if (!parent) throw new Error('Cannot find the document to update')

    //look for the child
    const child = parent[this.childName].id(filter[`${this.childName}._id`])

    //if it cannot find the child then throw error
    if (!child) throw new Error('Cannot find the sub-document to update')

    //merge the child
    _.merge(child, input)

    //this will save the details too
    return await parent.save()
  }

}
