import React from 'react'
import { Icon, TextEditor, TextViewer, withAlertDialog, Image, BusyButton , FormUtil} from 'pcmli.umbrella.web-ui'
import { withForm, withMutation } from 'pcmli.umbrella.core'
import { compose } from 'recompose'
import _ from 'lodash'

import { defaultUpdateMutationConfig, } from '../../../../services/user'

let ActivateUserButton = ({formProps, handleSubmit, submitting}) => {

  const handleClick = (doc) => {
    return formProps.onSubmit(doc)
  }

  return (
    <BusyButton icon="check-square" isBusy={submitting} text="Activate" busyText="Activating..." bsSize="small" bsStyle="primary" onClick={handleSubmit(handleClick)}/>
  )
}

const paramsToDoc = ({params}) => {
  return {
    _id: params._id,
    status: 'active'
  }
}
ActivateUserButton = compose(
  withMutation({...defaultUpdateMutationConfig(), refetchQueries: ['tenants'], paramsToDoc}),
  withForm({
    validate: (values, ownProps) => {
      const errors = {}

      if (values._id === ownProps.currentUser._id) {
        errors._id = 'Cannot delete yourself on the organization'

      }

      return errors
    },
    beforeUpdate: FormUtil.confirmOperation({
      confirmButtonText: 'Yes, activate it!',
      confirmButtonColor: '#1ab394',
      confirmMessage: (doc) => {
        const displayFieldValue = _.get(doc, 'profile.name', '')
        return `<strong>Are you sure you activate '${ displayFieldValue }'?</strong> <br/> <br/> After activation that user can start using this application!`
      }
    })
  })
)(ActivateUserButton)

export { ActivateUserButton }


