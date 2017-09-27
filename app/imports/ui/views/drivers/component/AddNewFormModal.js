import React from 'react'
import { Field } from 'redux-form'
import {  TextEditor, TagEditor } from 'pcmli.umbrella.web-ui'
import { compose } from 'recompose'
import { withMutation } from 'pcmli.umbrella.core'

import { defaultCreateMutationConfig, formConfig } from '../../../services/driver'
import { withFormModal } from '../../../containers'
import { routesDef } from '../../../../imports/startup/client/config/routes'

let AddNewFormModal = () => {
  return (
    <div>
      <Field name="code" label="Code\Email" component={TextEditor}/>
      <Field name="name" component={TextEditor}/>
      <Field name="tags" component={TagEditor}/>
    </div>
  )
}

const mutationConfig = {
  ...defaultCreateMutationConfig,
  after: ({response, ownProps}) => {
    const {history} = ownProps
    const {data: {mutateDrivers: {_id, code}}} = response
    history.push(`${routesDef.DriversDetailPage.altPath}${_id}/${code}`)
  },
}

AddNewFormModal = compose(
  withMutation(mutationConfig),
  withFormModal({props : {title: 'New driver'}, form: formConfig}))
(AddNewFormModal)

export { AddNewFormModal }
