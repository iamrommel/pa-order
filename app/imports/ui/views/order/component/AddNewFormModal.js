import React from 'react'
import { Field } from 'redux-form'
import { TextEditor } from 'pcmli.umbrella.web-ui'
import { compose } from 'recompose'
import { withMutation } from 'pcmli.umbrella.core'

import { CustomerTypeAutoSelectEditor } from '../../../components'
import { formConfig, defaultCreateMutationConfig } from '../../../services/order'
import { withFormModal, } from '../../../containers'
import { routesDef } from '../../../../startup/client/config/routes'

let AddNewFormModal = () => {
  return <div>
    <Field name="code" component={TextEditor}/>
    <Field name="name" component={TextEditor}/>
    <Field name="type" component={CustomerTypeAutoSelectEditor}/>
  </div>

}

const mutationConfig = {
  ...defaultCreateMutationConfig,
  after: ({response, ownProps}) => {
    const {history} = ownProps
    const {data: {mutateCustomers: {_id, code}}} = response
    history.push(`${routesDef.CustomersDetailPage.altPath}${_id}/${code}`)
  },
}

AddNewFormModal = compose(
  withMutation(mutationConfig),
  withFormModal({props: {title: 'New customer'}, form: formConfig}))
(AddNewFormModal)

export { AddNewFormModal }