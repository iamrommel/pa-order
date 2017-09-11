import React from 'react'
import { Icon, TextEditor, TextViewer, withAlertDialog, Image, BusyButton, FormUtil  } from 'pcmli.umbrella.web-ui'
import { withForm, withMutation } from 'pcmli.umbrella.core'
import { compose } from 'recompose'

import { defaultUpdateMutationConfig, } from '../../../../services/user'

let RemoveUserButton = ({formProps, handleSubmit, submitting}) => {

  const handleClick = (doc) => {
    return formProps.onSubmit(doc)
  }

  return (
    <BusyButton icon="trash" isBusy={submitting} text="Remove" busyText="Removing..." bsSize="small" bsStyle="primary" onClick={handleSubmit(handleClick)}/>
  )
}
const paramsToDoc = ({params}) => {
  return {
    _id: params._id,
    tenantId: null
  }
}
RemoveUserButton = compose(
  withMutation({...defaultUpdateMutationConfig(), refetchQueries: ['tenants'], paramsToDoc}),
  withForm({
    validate: (values, ownProps) => {
      const errors = {}

      if (values._id === ownProps.currentUser._id) {
        errors._id = 'Cannot delete yourself on the organization'

      }

      return errors
    },
    beforeUpdate: FormUtil.beforeDelete({displayField: 'profile.name'})
  })
)(RemoveUserButton)

export { RemoveUserButton }


