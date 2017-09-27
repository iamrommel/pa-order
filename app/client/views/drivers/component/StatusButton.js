import React from 'react'
import { withMutation } from 'pcmli.umbrella.core'
import { withAlertDialog, DisplayHelpBlock, BusyButton, FormUtil } from 'pcmli.umbrella.web-ui'
import { compose } from 'recompose'

import { DriverModel } from '../../../../imports/api/driver/model'
import { defaultUpdateMutationConfig } from '../../../services/driver'
import { withForm, } from '../../../containers'

let StatusButton = ({driver, alertDialog, formProps, handleSubmit, submitting}) => {

  const {onUpdate} = formProps
  let {status, _id, code} = driver || {}
  const {confirm} = alertDialog

  let statusLabel = 'De-activate'
  let buttonStyle = 'danger'
  let helpMessage = 'Once you de-activate this driver you cannot use it for future routes, but it still retains the existing mainRoutes and reports.'

  if (status === DriverModel.status.inActive) {
    statusLabel = 'Activate'
    buttonStyle = 'primary'
    helpMessage = 'Activating this driver includes him on the list to be used routes.'
  }

  const __handleSave = () => {
    const newStatus = status === DriverModel.status.inActive ? DriverModel.status.active : DriverModel.status.inActive
    const doc = {status: newStatus, _id: _id}

    return onUpdate(doc)
  }

  const handleUpdateStatus = () => {

    //show message if deactivating
    //ask here if it's ok to delete
    if (status === DriverModel.status.active) {
      const config = {
        text: `Are you sure you want de-activate driver <strong>${code}</strong>`,
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

//let update the status button
const mutationConfig = {
  ...defaultUpdateMutationConfig,
  paramsToDoc: ({params}) => {
    return {
      $set : {
        _id: params._id,
        status: params.status
      }
    }
  },
  after: FormUtil.afterUpdate({successMessage: 'Successfully updated the status'})
}

StatusButton = compose(
  withMutation(mutationConfig),
  withAlertDialog(),
  withForm()
)(StatusButton)

export { StatusButton }
