import React from 'react'
import { PageHeader, PageContent, Breadcrumb, IboxContent, BusyButton, TextEditor } from 'pcmli.umbrella.web-ui'
import { withForm, withMutation } from 'pcmli.umbrella.core'
import { Field } from 'redux-form'
import { compose } from 'recompose'

import { LogoutButton } from '../../../../components'
import { joinFormConfig, addTenantUserMutationConfig } from '../../../../services/tenant'

let Form = ({formProps, handleSubmit, submitting}) => {
  return (
    <div>
      <div>
        <Field component={TextEditor} name="code" label="Organization Code"
               help="Put here the organization code or the invitation code that your organization provided so you can start using the application"/>

      </div>

      <div className="row">
        <div className="col-md-7">
          <BusyButton icon="users" bsSize="large" text="Join" block bsStyle="primary" busyText="Submitting" isBusy={submitting} onClick={handleSubmit(formProps.onUpdate)}/>
        </div>
        <div className="col-md-5">
          <LogoutButton text="Back"/>
        </div>
      </div>
    </div>
  )
}

Form = compose(
  withMutation(addTenantUserMutationConfig()),
  withForm(joinFormConfig))(Form)
export { Form }


