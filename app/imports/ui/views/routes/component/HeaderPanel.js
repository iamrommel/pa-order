import React from 'react'
import { Field } from 'redux-form'
import { Utils, withMutation } from 'pcmli.umbrella.core'
import { TextEditor, TagEditor, NumberEditor, TextAreaEditor, TextViewer, TagViewer, FormUtil } from 'pcmli.umbrella.web-ui'
import { compose } from 'recompose'

import { StatusButton } from './StatusButton'
import { formConfig, defaultUpdateMutationConfig, defaultParamsToDoc } from '../../../services/route'
import { withFormPanel } from '../../../containers'

const ViewMode = (props) => {

  const {initialValues} = props

  return (
    <div className="route-side-panel">
      <Field name="code" component={TextViewer} help="A unique identifier for this route."/>
      <Field name="remarks" component={TextViewer} help={'Some text to help describe about this route.'}/>
      <Field name="distance" component={TextViewer} type="number" formatContent={(m) => ( `${Utils.formatNumber(m)} km.`  )}
             help="The total distance from starting point until the end of the route."/>
      <Field name="tags" component={TagViewer} type="tag"/>

      <hr/>
      <div className="m-t-md">
        <StatusButton route={initialValues}/>
      </div>
    </div>

  )
}
const EditMode = () => {
  return (
    <div className="route-side-panel">
      <Field name="code" component={TextEditor} help="A unique identifier for this route."/>
      <Field name="remarks" component={TextAreaEditor} help={'Some text to help describe about this route.'}/>
      <Field name="distance" component={NumberEditor}
             help="The total distance from starting point until the end of the route."/>
      <Field name="tags" component={TagEditor}/>
    </div>

  )
}

let HeaderFormPanel = ({panel}) => {
  return panel
}

const mutationConfig = {
  ...defaultUpdateMutationConfig,
  paramsToDoc: ({params}) => {
    const defaultParams = defaultParamsToDoc({params})
    return {$set: defaultParams}
  },
  after: FormUtil.afterUpdate({displayField: 'code'})
}

HeaderFormPanel = compose(
  withMutation(mutationConfig),
  withFormPanel({form: formConfig, panel: {edit: EditMode, view: ViewMode}}),
)(HeaderFormPanel)

export const HeaderPanel = ({data}) => {

  return (
    <HeaderFormPanel
      title="Routes"
      initialValues={data}
    />
  )
}






