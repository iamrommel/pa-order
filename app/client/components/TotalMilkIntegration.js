import React from 'react'
import { Field } from 'redux-form'
import { NumberEditor, TextViewer, FormUtil } from 'pcmli.umbrella.web-ui'
import { withMutation } from 'pcmli.umbrella.core'
import { compose } from 'recompose'
import _ from 'lodash'

import { withFormPanel } from '../containers'

const externalIdField = {name: '_syncInfo.externalId', label: 'Id', help: 'The unique identifier from TotalMilk systems.'}
const ViewMode = () => {
  return (
    <div>
      <Field component={TextViewer} {...externalIdField}/>
    </div>
  )
}
const EditMode = () => {
  return (
    <div>
      <Field component={NumberEditor} {...externalIdField}/>
    </div>
  )
}

let FormPanel = ({panel}) => {
  return panel || null
}
const paramsToDoc = ({params}) => {
  const result = _.pick(params, ['_syncInfo.externalId'])
  return {$set: result}
}

export const TotalMilkIntegration = (props) => {

  let {mutationConfig} = props

  const formConfig = {
    form: 'TotalMilkIntegrationForm',
    validate: (values) => {
      const errors = {}

      if (!values._syncInfo || !values._syncInfo.externalId) {
        errors._syncInfo = {
          code: 'Required'
        }
      }

      return errors
    }
  }

  const updateMutationConfig = {
    ...mutationConfig,
    paramsToDoc,
    after: FormUtil.afterUpdate({successMessage: (doc) => ( `Successfully updated the TotalMilk integration information of ${doc.name}` )})
  }
  const Form = compose(
    withMutation(updateMutationConfig),
    withFormPanel({form: formConfig, panel: {edit: EditMode, view: ViewMode}}),
  )(FormPanel)

  return <Form title="Total Milk" {...props}/>

}