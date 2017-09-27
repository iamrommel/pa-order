import React from 'react'
import { NumberEditor, TextEditor, DateEditor, FormUtil } from 'pcmli.umbrella.web-ui'
import { withMutation } from 'pcmli.umbrella.core'
import { compose } from 'recompose'
import { Field } from 'redux-form'
import _ from 'lodash'

import { withFormModal, } from '../../../../containers'
import { defaultUpdateMutationConfig, itemFormConfig } from '../../../../services/pickup'
import { ProducerAutoSelectEditor, GradeTypeAutoSelectEditor, TemperatureBarEditor } from '../../../../components'

const Form = () => {
  return (
    <div>
      <Field name="details.$.customer" label="Producer" component={ProducerAutoSelectEditor}/>
      <Field name="details.$.weight" label="Weight" component={NumberEditor} type="number" min={0}/>
      <Field name="details.$.gradeType" label="Grade Type" component={GradeTypeAutoSelectEditor}/>
      <Field name="details.$.temperature" label="Temperature" component={TemperatureBarEditor} type="temperatureBar"/>
      <Field name="details.$.code" label="Code" component={TextEditor}/>
      <Field name="details.$.timeStamp" label='Date & Time' component={DateEditor} timeFormat/>
      <Field name="details.$.remarks" label="Remarks" component={TextEditor}/>
    </div>
  )
}

const updateMutationConfig = {
  ...defaultUpdateMutationConfig,
  paramsToDoc: ({params}) => {
    let result = {}
    const weight = _.get(params, 'details.$.weight', 0)
    const _id = _.get(params, 'details.$._id')
    result['details.$.pickupId'] = _.get(params, 'details.$.pickupId')
    result['details.$._id'] = _id
    result['details.$.gradeType'] = _.get(params, 'details.$.gradeType.value') || _.get(params, 'details.$.gradeType')
    result['details.$.temperature'] = _.get(params, 'details.$.temperature')
    result['details.$.code'] = _.get(params, 'details.$.code')
    result['details.$.timeStamp'] = _.get(params, 'details.$.timeStamp')
    result['details.$.weight'] = weight
    result['details.$.customer._id'] = _.get(params, 'details.$.customer._id')
    result['details.$.customer._syncInfo.externalId'] = _.get(params, 'details.$.customer._syncInfo.externalId')
    result['details.$.remarks'] = _.get(params, 'details.$.remarks')


    result = {$set: result}
    return result
  },

  after: FormUtil.afterOperation({successMessage: 'Successfully updated pickup item'}),
}
const deleteMutationConfig = {
  ...defaultUpdateMutationConfig,
  methodName: 'onDelete', //method name and action name should be define so the deleteButon will appear, even though this is update operation
  actionName: 'Delete',
  paramsToDoc: ({params}) => {
    const _id = _.get(params, 'details.$._id')

    return {

      $pull:
        {details: {_id}}
    }
  },

  after: FormUtil.afterOperation({successMessage: 'Successfully deleted pickup item'}),
  before: FormUtil.beforeDelete()
}
const createMutationConfig = {
  ...defaultUpdateMutationConfig,
  methodName: 'onCreate', //method name and action name should be define so the create will appear, even though this is update operation
  actionName: 'Create',
  paramsToDoc: ({params}) => {

    const details = _.pick(params.details.$, [
      'pickupId'
      , '_id'
      , 'gradeType'
      , 'temperature'
      , 'code'
      , 'timeStamp'
      , 'weight'
      , 'customer._id'
      , 'customer._syncInfo.externalId'
      , 'remarks'
    ])
    details.gradeType = _.get(params.details.$, 'gradeType.value') || _.get(params.details.$, 'gradeType')

    return {
      $set : {
        totalWeight : 100000
      },
      $push: {
        details
      }
    }
  },
  after: FormUtil.afterCreate({successMessage: 'Successfully added pickup item'}),
}

const EditItemFormModal = compose(
  withMutation(updateMutationConfig),
  withMutation(deleteMutationConfig),
  withFormModal({props: {title: 'Modify pickup item'}, form: itemFormConfig}))
(Form)

const AddItemFormModal = compose(
  withMutation(createMutationConfig),
  withFormModal({props: {title: 'New pickup item'}, form: itemFormConfig}))
(Form)

export { AddItemFormModal }
export { EditItemFormModal }
