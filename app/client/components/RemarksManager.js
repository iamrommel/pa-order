import React from 'react'
import { compose } from 'recompose'
import { withFormModal, RemarksForm, RemarksDisplay, Icon, FormUtil } from 'pcmli.umbrella.web-ui'
import { withMutation } from 'pcmli.umbrella.core'

const updateQueryConfig = {
  paramsToDoc: ({params}) => {
    return {
      remarks: params.remarks
    }
  },
  after: FormUtil.afterUpdate({successMessage: 'Successfully updated the remarks!'})
}

export const RemarksManager = (props) => {

  let {mutationConfig} = props
  mutationConfig = {...mutationConfig, ...updateQueryConfig}

  const form = {
    form: 'remarksForm',
  }

  const RemarksFormModal = compose(
    withMutation(mutationConfig),
    withFormModal({form})
  )(RemarksForm)

  const triggerComponent = <a className="pull-right btn btn-primary btn-xs ">
    <Icon name="pencil-square"/>
  </a>

  const updateTriggerComponent = <RemarksFormModal triggerComponent={triggerComponent} initialValues={{...props}}/>
  return (
    <div className="m-l-sm m-r-sm m-t-lg">
      <RemarksDisplay {...props} updateTriggerComponent={updateTriggerComponent}/>
    </div>
  )
}

