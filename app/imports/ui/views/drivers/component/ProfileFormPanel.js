import React from 'react'
import { Field } from 'redux-form'
import { withFormPanel, TextEditor, TextViewer, FormUtil } from 'pcmli.umbrella.web-ui'
import { withMutation } from 'pcmli.umbrella.core'
import { compose } from 'recompose'

import { withError } from '../../../containers'
import { defaultUpdateMutationConfig, formConfig, defaultParamsToDoc } from '../../../services/driver'

const ViewMode = () => {

  return (
    <div>
      <Field name="code" label="Code\Email" component={TextViewer}
             help="Your personalized identifier for this driver. Email address is a good choice."/>

      <Field name="name" label="Name" component={TextViewer}
             help="The full name of the driver that are shown on several reports."/>

    </div>
  )
}
const EditMode = () => {
  return (
    <div>
      <Field name="code" label="Code\Email" component={TextEditor} help="Your personalized identifier for this driver. Email address is a good choice."/>
      <Field name="name" component={TextEditor} help="The full name of the driver that are shown on several reports."/>
    </div>
  )
}

let ProfileFormPanel = ({panel}) => {
  return panel || null
}

const updateMutationConfig = {
  ...defaultUpdateMutationConfig,
  paramsToDoc: ({params}) => {
    const defaultParams = defaultParamsToDoc({params})

    return {$set: defaultParams}
  },
  after: FormUtil.afterUpdate({successMessage: (doc) => ( `Successfully updated the profile of ${doc.name}` )})
}

ProfileFormPanel = compose(
  withMutation(updateMutationConfig),
  withError(),
  withFormPanel({form: formConfig, panel: {edit: EditMode, view: ViewMode}}),
)(ProfileFormPanel)

export { ProfileFormPanel }
