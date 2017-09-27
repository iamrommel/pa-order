import React from 'react'
import { TextEditor, TextViewer, } from 'pcmli.umbrella.web-ui'
import { withMutation } from 'pcmli.umbrella.core'
import { Field } from 'redux-form'
import { compose } from 'recompose'

import { withUser } from '../../../../containers/withUser'
import { formConfig, defaultUpdateMutationConfig, } from '../../../../services/tenant'
import { withFormPanel } from '../../../../containers/index'

const nameField = {
  name: 'name',
  help: 'Put here the name of organization you belong'
}
const codeField = {
  name: 'code',
  help: 'A unique identifier for your organization. Your member will use this also when they try to join your organization'
}

const ViewMode = () => {
  return (
    <div>
      <Field component={TextViewer} {...codeField} />
      <Field component={TextViewer} {...nameField} />
    </div>
  )
}

const EditMode = () => {
  return (
    <div>
      <Field component={TextEditor} {...codeField}/>
      <Field component={TextEditor} {...nameField}/>

    </div>
  )
}

let Form = ({panel}) => {
  return panel || null

}

Form = compose(
  withUser,
  withMutation(defaultUpdateMutationConfig()),
  withFormPanel({form: formConfig, panel: {edit: EditMode, view: ViewMode}}),
)(Form)

export {Form}





