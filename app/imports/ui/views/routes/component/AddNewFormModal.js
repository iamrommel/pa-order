import React from 'react'
import { Field } from 'redux-form'
import { TextEditor, TextAreaEditor, TagEditor } from 'pcmli.umbrella.web-ui'
import { compose } from 'recompose'
import { withMutation } from 'pcmli.umbrella.core'

import { defaultCreateMutationConfig, formConfig } from '../../../services/route'
import { withFormModal } from '../../../containers'
import { routesDef } from '../../../../imports/startup/client/config/routes'

let AddNewFormModal = () => {

  return <div >
    <Field name="code" component={TextEditor}/>
    <Field name="remarks" component={TextAreaEditor}/>
    <Field name="tags" component={TagEditor} type="tag"/>
  </div>
}

const mutationConfig = {
  ...defaultCreateMutationConfig,
  after: ({response, ownProps}) => {
    const {history} = ownProps
    const {data: {mutateRoutes: {_id, code}}} = response
    history.push(`${routesDef.RoutesDetailPage.altPath}${_id}/${code}`)
  },
}

const formModalConfig = {
  props: {title: 'New route'},
  form: formConfig
}
AddNewFormModal = compose(
  withMutation(mutationConfig),
  withFormModal(formModalConfig)
)
(AddNewFormModal)

export { AddNewFormModal }