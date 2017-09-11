import React from 'react'
import { Field } from 'redux-form'
import _ from 'lodash'
import { withMutation, } from 'pcmli.umbrella.core'
import { DateViewer, TextEditor, DateEditor, TextViewer, FormUtil } from 'pcmli.umbrella.web-ui'
import { Utils } from 'pcmli.umbrella.core'
import { compose } from 'recompose'

import { RouteAutoSelectEditor, RouteViewer } from '../../../../components'
import { withFormPanel } from '../../../../containers'
import { formConfig, defaultParamsToDoc, defaultUpdateMutationConfig, defaultDeleteMutationConfig } from '../../../../services/pickup'

const ViewMode = () => {
  return (
    <div>
      <Field name="ticketNo" component={TextViewer} label="Ticket No." help="The unique identifier for this pickup/ticket"/>
      <Field name="timeStamp" label='Date & Time' component={TextViewer} formatContent={(m) => ( Utils.formatDateTime(m) )}
             help="The date and time of that this pickup started."/>
      <Field name="totalWeight" component={TextViewer} formatContent={(m) => ( Utils.formatNumber(m) + ' lbs.' )}
             help="The sum of all weight for this pickup"/>
      <Field name="route" label="Route" component={RouteViewer}/>
    </div>
  )
}

let EditMode = () => {
  return (
    <div>
      <Field name="ticketNo" component={TextEditor}/>
      <Field name="timeStamp" label='Date & Time' component={DateEditor} timeFormat/>
      <Field name="route" label='Route' component={RouteAutoSelectEditor}/>
    </div>
  )
}

let HeaderFormPanel = ({panel}) => {
  return panel || null
}

const paramsToDoc = ({params}) => {

  const route = _.pick(params, 'route._id')

  return {
    $set: {
      ...defaultParamsToDoc({params}),
      ...route
    }
  }
}

const updateMutationConfig = {
  ...defaultUpdateMutationConfig,
  paramsToDoc,
  after: FormUtil.afterUpdate({displayField: 'ticketNo'})
}
const deleteMutationConfig = {
  ...defaultDeleteMutationConfig,
  paramsToDoc,
  after: FormUtil.afterDelete({displayField: 'ticketNo'}),
  before: FormUtil.beforeDelete({displayField: 'ticketNo'}),
}

const formPanelConfig = {
  props: {title: 'Pickup Information'},
  form: formConfig,
  panel: {edit: EditMode, view: ViewMode}
}

HeaderFormPanel = compose(
  withMutation(updateMutationConfig),
  withMutation(deleteMutationConfig),
  withFormPanel(formPanelConfig),
)(HeaderFormPanel)

export { HeaderFormPanel }