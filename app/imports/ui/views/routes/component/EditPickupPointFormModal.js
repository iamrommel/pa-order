import React from 'react'
import { Field, } from 'redux-form'
import { withAlertDialog, NumberEditor, TextEditor, FormUtil } from 'pcmli.umbrella.web-ui'
import { compose } from 'recompose'
import { Utils, withMutation } from 'pcmli.umbrella.core'
import _ from 'lodash'

import { CustomerAutoSelectEditor } from '../../../components'
import { defaultUpdateMutationConfig } from '../../../services/route'
import { withFormModal, } from '../../../containers'

let PickupPointsForm = ({route = {}}) => {

  const {details} = route
  let customerIds = details.map((m) => {
    return m.customer && m.customer._id
  })
  customerIds = customerIds || []

  return (
    <div>
      <Field name="selectedRouteDetail.customer" label="Customer" component={CustomerAutoSelectEditor} searchObject={{'_id': {'$nin': customerIds}}}
             help="Select the customer to pickup on this route"/>
      <Field name="selectedRouteDetail.position" component={NumberEditor} label="Position" help="The order of pickup according this position"/>
    </div>
  )
}

const updateMutationConfig = {
  ...defaultUpdateMutationConfig,
  paramsToDoc: ({params = {}}) => {
    return {
      $set: {
        'details.$.position': params.selectedRouteDetail.position,
        'details.$.customerId': _.get(params.selectedRouteDetail, 'customer._id')
      }
    }
  }
}

const deleteMutationConfig = {
  ...defaultUpdateMutationConfig,
  methodName: 'onDelete', //method name and action name should be define so the deleteButon will appear, even though this is update operation
  actionName: 'Delete',
  paramsToDoc: ({params}) => {
    return {$pull: {details: {_id: params.selectedRouteDetail._id}}}
  },
  before: FormUtil.beforeDelete({displayField: 'customer.summary'})
}

const formModalConfig = {
  props: {
    title: 'Edit pickup point',
  },
  form: {
    validate: (values) => {
      const errors = {}

      if (!values.position)
        errors.position = 'Required'

      return errors
    }
  }
}

const EditPickupPointFormModal = compose(
  withMutation(updateMutationConfig),
  withMutation(deleteMutationConfig),
  withAlertDialog(),
  withFormModal(formModalConfig))
(PickupPointsForm)

export { EditPickupPointFormModal }