import React from 'react'
import { withMutation } from 'pcmli.umbrella.core'
import { withAlertDialog, DisplayHelpBlock, BusyButton, FormUtil } from 'pcmli.umbrella.web-ui'
import { compose } from 'recompose'

import { defaultUpdateMutationConfig } from '../../../services/route'
import { RouteModel } from '../../../../imports/api/route/model'
import { withForm } from '../../../containers'

let StatusButton = ({route, alertDialog, formProps, handleSubmit, submitting}) => {

  const {onUpdate} = formProps
  const {confirm} = alertDialog
  let {status, _id, code} = route || {}

  let statusLabel = 'De-activate'
  let buttonStyle = 'danger'
  let helpMessage = 'Once you de-activate this route you cannot use it for future pickups, but it still retains the existing pickups and reports.'

  if (status === RouteModel.status.inActive) {
    statusLabel = 'Activate'
    buttonStyle = 'primary'
    helpMessage = 'Activating this route includes him on the list to be used for pickup.'
  }

  const __handleSave = () => {
    const newStatus = status === RouteModel.status.inActive ? RouteModel.status.active : RouteModel.status.inActive
    const doc = {status: newStatus, _id: _id}

    return onUpdate(doc)
  }

  const handleUpdateStatus = () => {

    //show message if deactivating
    //ask here if it's ok to delete
    if (status === RouteModel.status.active) {
      const config = {
        text: `Are you sure you want de-activate route <strong>${code}</strong>`,
        confirmButtonText: 'Yes, de-activate it!',
      }

      return new Promise((resolve) => {
        confirm({
          confirmed: () => {
            return __handleSave().then(() => {
              resolve()
            })
          },
          cancelled: () => {
            resolve()
          },
          confirmConfig: config
        })
      })

    }
    else {
      //just update it without notification
      return __handleSave()
    }
  }

  return (
    <div>
      <DisplayHelpBlock value={helpMessage}/>
      <BusyButton type="button" onClick={handleSubmit(() => { return handleUpdateStatus() })}
                  isBusy={submitting} bsStyle={buttonStyle}>{statusLabel}</BusyButton>
    </div>
  )
}

const mutationConfig = {
  ...defaultUpdateMutationConfig,
  paramsToDoc: ({params}) => {
    return {
      $set: {
        _id: params._id,
        status: params.status
      }
    }
  },
  after: FormUtil.afterUpdate({successMessage: 'Successfully updated the status'}),
}

//let update the status button
StatusButton = compose(
  withMutation(mutationConfig),
  withAlertDialog(),
  withForm()
)(StatusButton)

export { StatusButton }
