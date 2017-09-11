import React from 'react'
import { Meteor } from 'meteor/meteor'
import { TextViewer, FormUtil, GoogleMaps } from 'pcmli.umbrella.web-ui'
import { withMutation } from 'pcmli.umbrella.core'
import { compose } from 'recompose'
import _ from 'lodash'
import { Field } from 'redux-form'

import { withFormPanel } from '../../../containers'
import { defaultUpdateMutationConfig, formConfig } from '../../../services/customer'
import { Contact } from '../../../components'

const ViewMode = ({initialValues}) => {

  const address = _.get(initialValues, 'contact.address1')
  return (
    <div>
      <Field name="contact.email" component={TextViewer} label="Email"
             help="You can use this to information to send email to your driver."/>
      <Field name="contact.phone" component={TextViewer} label="Phone"
             help="Phone numbers are useful to contact your driver."/>
      <Field name="contact.address1.fullAddress" component={TextViewer} label="Address"
             help="This is the physical address of your driver."/>

      <Field name="contact.address1.gps" component={TextViewer} label="GPS" formatContent={(m) => ( _.get(m, 'lng') + ', ' + _.get(m, 'lat')  )}
             help="The longitude and latitude of the specified address."/>

      <hr/>

      <GoogleMaps address={address} googleApiKey={Meteor.settings.public.GOOGLE_API_KEY}/>

    </div>
  )
}
const EditMode = () => {
  return <Contact/>
}

let ContactFormPanel = ({panel}) => {
  return panel || null
}

const paramsToDoc = ({params}) => {
  return {
    $set: {
      _id: params._id,
      contact: FormUtil.buildContact({params})
    }
  }
}

const updateMutationConfg = {
  ...defaultUpdateMutationConfig,
  paramsToDoc,
  after: FormUtil.afterUpdate({successMessage: (doc) => ( `Successfully updated the contacts of ${doc.name}` )})

}

ContactFormPanel = compose(
  withMutation(updateMutationConfg),
  withFormPanel({form: formConfig, panel: {edit: EditMode, view: ViewMode}}),
)(ContactFormPanel)

export { ContactFormPanel }
