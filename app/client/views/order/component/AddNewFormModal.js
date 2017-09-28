import React from 'react'
import { Field } from 'redux-form'
import { TextEditor, DateEditor } from 'pcmli.umbrella.web-ui'
import { compose } from 'recompose'
import { withMutation } from 'pcmli.umbrella.core'

import { formConfig, defaultCreateMutationConfig } from '../../../services/order'
import { withFormModal, } from '../../../containers'
import { routesDef } from '../../../../imports/startup/client/config/routes'

let AddNewFormModal = () => {
  return <div>
    <Field name="code" component={TextEditor}/>
    <Field name="timeStamp" component={DateEditor} includeTime/>
  </div>

}

const mutationConfig = {
  ...defaultCreateMutationConfig,
  after: ({response, ownProps}) => {
    const {history} = ownProps
    const {data: {createOrder: {_id, code}}} = response
    history.push(`${routesDef.OrderDetailPage.altPath}${_id}/${code}`)
  },
}

AddNewFormModal = compose(
  withMutation(mutationConfig),
  withFormModal({props: {title: 'New order'}, form: formConfig}))
(AddNewFormModal)

export { AddNewFormModal }