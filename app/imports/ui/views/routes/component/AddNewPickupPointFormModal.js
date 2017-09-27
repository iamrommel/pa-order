import React from 'react'
import { Field } from 'redux-form'
import { Utils } from 'pcmli.umbrella.core'
import { TextEditor, TextAreaEditor, TagEditor } from 'pcmli.umbrella.web-ui'
import { compose, } from 'recompose'
import { withMutation } from 'pcmli.umbrella.core'
import _ from 'lodash'

import { CustomerAutoSelectEditor } from '../../../components'
import { defaultUpdateMutationConfig, formConfig } from '../../../services/route'
import { withFormModal, } from '../../../containers/index'
import { RouteModel } from '../../../../imports/api/route/model'

let AddNewPickupPointFormModal = ({route = {}}) => {

  const {details} = route
  let customerIds = details.map((m) => {
    return m.customer && m.customer._id
  })
  customerIds = customerIds || []

  return <Field name="customer" component={CustomerAutoSelectEditor} searchObject={{'_id': {'$nin': customerIds}}}/>
}

const mutationConfig = {
  ...defaultUpdateMutationConfig,
  paramsToDoc: ({params}) => {

    let {details = [], customer} = params
    const detail = _.maxBy(details, 'position') || {}
    let {position} = detail
    position = (position || 0) + 1

    //push the new details
    return {
      $push: {
        details: {
          customerId: customer._id,
          _id: Utils.generateId(17),
          position
        }
      }
    }
  }
}

const formModalConfig = {
  props: {title: 'New pickup point'},
  form: {
    validate: (values) => {
      const errors = {}

      if (!values.customer)
        errors.customer = 'Required'

      return errors
    }
  }
}

AddNewPickupPointFormModal = compose(
  withMutation(mutationConfig),
  withFormModal(formModalConfig))
(AddNewPickupPointFormModal)

export { AddNewPickupPointFormModal }