import React from 'react'
import { Field } from 'redux-form'
import { TextEditor, TextViewer, FormUtil } from 'pcmli.umbrella.web-ui'
import { withMutation } from 'pcmli.umbrella.core'
import { compose } from 'recompose'
import _ from 'lodash'

import { withFormPanel } from '../../../containers'
import { defaultUpdateMutationConfig, formConfig } from '../../../services/customer'
import { CustomerTypeAutoSelectEditor } from '../../../components'

const ViewMode = () => {
  return (
    <div>
      <Field name="code" component={TextViewer} help="Your personalized identifier for this customer"/>
      <Field name="name" component={TextViewer}
             help="The full name that displays on pickup and other reports."/>
      <Field name="type" component={TextViewer}
             help="Customer type determine which it will be used. 'Plants' are normally the destination of pickup, while 'Milk Producer' are the customer where milks are being sourced."/>


    </div>
  )
}
const EditMode = () => {
  return (
    <div>
      <Field name="code" component={TextEditor} help="Your personalized identifier for this customer"/>
      <Field name="name" component={TextEditor} help="The full name that displays on pickup and other reports."/>
      <Field name="title" component={TextEditor}/>
      <Field name="type" component={CustomerTypeAutoSelectEditor}
             help="Customer type determine which it will be used. 'Plants' are normally the destination of pickup, while 'Milk Producer' are the customer where milks are being sourced."/>

    </div>
  )
}

let ProfileFormPanel = ({panel}) => {
  return panel || null
}

const paramsToDoc = ({params}) => {

  const type = _.get(params, 'type.value') || _.get(params, 'type') || ''

  const result = _.pick(params, ['_id', 'code', 'name', 'title'])
  result.type = type
  result.summary = `${params.code} - ${params.name}`
  return {$set: result}
}

const updateMutationConfig = {
  ...defaultUpdateMutationConfig,
  paramsToDoc,
  after: FormUtil.afterUpdate({successMessage: (doc) => ( `Successfully updated the profile of ${doc.name}` )})
}

ProfileFormPanel = compose(
  withMutation(updateMutationConfig),
  withFormPanel({form: formConfig, panel: {edit: EditMode, view: ViewMode}}),
)(ProfileFormPanel)

export { ProfileFormPanel }
