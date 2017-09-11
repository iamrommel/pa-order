import React from 'react'
import { Field } from 'redux-form'
import { TextEditor, DateEditor } from 'pcmli.umbrella.web-ui'
import { compose, withProps } from 'recompose'
import { withMutation } from 'pcmli.umbrella.core'

import { defaultCreateMutationConfig, formConfig } from '../../../../services/pickup'
import { withFormModal } from '../../../../containers/index'
import { routesDef } from '../../../../../imports/startup/client/config/routes'

let AddNewFormModal = () => {
  return (
    <div>
      <Field name="ticketNo" component={TextEditor}/>
      <Field name="timeStamp" label='Date & Time' component={DateEditor} timeFormat/>
    </div>
  )
}

const mutationConfig = {
  ...defaultCreateMutationConfig,
  after: ({response, ownProps}) => {
    const {history} = ownProps
    const {data: {mutatePickups: {_id, ticketNo}}} = response
    history.push(`${routesDef.PickupDetailPage.altPath}${_id}/${ticketNo}`)
  },
}

const formModalConfig = {
  props: {title: 'New pickup'},
  form: formConfig
}

AddNewFormModal = compose(
  withMutation(mutationConfig),
  withFormModal(formModalConfig))
(AddNewFormModal)

export { AddNewFormModal }

