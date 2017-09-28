import React from 'react'
import { compose } from 'recompose'
import { withFormModal, TagsForm, TagsDisplay, Icon, FormUtil } from 'pcmli.umbrella.web-ui'
import { withMutation } from 'pcmli.umbrella.core'

const paramsToDoc = ({params}) => {
  return {
    tags: params.tags
  }
}

export const TagsManager = (props) => {

  let {mutationConfig} = props
  mutationConfig = {...mutationConfig, paramsToDoc}

  const form = {
    form: 'tagsForm',
    afterUpdate: FormUtil.afterUpdate({successMessage: 'Successfully updated the tags!'})
  }

  const ModalDialog = compose(
    withMutation(mutationConfig),
    withFormModal({form})
  )(TagsForm)

  const triggerComponent = <a className="pull-right btn btn-primary btn-xs ">
    <Icon name="pencil-square"/>
  </a>

  const updateTriggerComponent = <ModalDialog triggerComponent={triggerComponent} initialValues={{...props}}/>
  return (
    <div className="m-l-sm m-r-sm m-t-lg">
      <TagsDisplay {...props} updateTriggerComponent={updateTriggerComponent}/>
    </div>
  )
}

