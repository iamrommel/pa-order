import React from 'react'
import { NumberEditor, DateEditor, FormUtil } from 'pcmli.umbrella.web-ui'
import { withMutation } from 'pcmli.umbrella.core'
import { compose } from 'recompose'
import { Field } from 'redux-form'
import _ from 'lodash'

import { withFormModal } from '../../../../containers'
import { defaultUpdateMutationConfig, deliveryFormConfig } from '../../../../services/pickup'
import { PlantAutoSelectEditor } from '../../../../components'

const Form = () => {
  return (
    <div>
      <Field name="deliveries.$.customer" label="Plant" component={PlantAutoSelectEditor}/>
      <Field name="deliveries.$.weight" label="Weight" component={NumberEditor} min={0}/>
      <Field name="deliveries.$.timeStamp" label='Date & Time' component={DateEditor} timeFormat/>
    </div>
  )
}

const updateMutationConfig = {
  ...defaultUpdateMutationConfig,
  paramsToDoc: ({params}) => {
    let result = {}
    result['deliveries.$.customer._id'] = _.get(params, 'deliveries.$.customer._id')
    result['deliveries.$.customer._syncInfo.externalId'] = _.get(params, 'deliveries.$.customer._syncInfo.externalId')
    result['deliveries.$.timeStamp'] = _.get(params, 'deliveries.$.timeStamp')
    result['deliveries.$.weight'] = _.get(params, 'deliveries.$.weight')

    result = {$set: result}
    return result
  },
  after: FormUtil.afterOperation({successMessage: 'Successfully updated delivery'}),
}
const deleteMutationConfig = {
  ...defaultUpdateMutationConfig,
  methodName: 'onDelete', //method name and action name should be define so the deleteButon will appear, even though this is update operation
  actionName: 'Delete',
  paramsToDoc: ({params}) => {
    return {$pull: {deliveries: {_id: params.deliveries.$._id}}}
  },

  after: FormUtil.afterOperation({successMessage: 'Successfully deleted delivery'}),
  before: FormUtil.beforeDelete()
}
const createMutationConfig = {
  ...defaultUpdateMutationConfig,
  methodName: 'onCreate', //method name and action name should be define so the create will appear, even though this is update operation
  actionName: 'Create',
  paramsToDoc: ({params}) => {

    const deliveries = _.pick(params.deliveries.$, [
      'customer._id'
      , 'customer._syncInfo.externalId'
      , 'pickupId'
      , '_id'
      , 'timeStamp'
      , 'weight'
    ])

    return {
      $push: {
        deliveries
      }
    }
  },
  after: FormUtil.afterCreate({successMessage: 'Successfully added delivery'}),
}

const EditDeliveryFormModal = compose(
  withMutation(updateMutationConfig),
  withMutation(deleteMutationConfig),
  withFormModal({props: {title: 'Modify pickup delivery'}, form: deliveryFormConfig}))
(Form)

const AddDeliveryFormModal = compose(
  withMutation(createMutationConfig),
  withFormModal({props: {title: 'New pickup delivery'}, form: deliveryFormConfig}))
(Form)

export { AddDeliveryFormModal }
export { EditDeliveryFormModal }
