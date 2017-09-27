import React from 'react'
import { withFormPanel, TextViewer, GoogleMaps } from 'pcmli.umbrella.web-ui'
import { withMutation, Utils } from 'pcmli.umbrella.core'
import { compose } from 'recompose'
import _ from 'lodash'
import { Field } from 'redux-form'
import { Meteor } from 'meteor/meteor'


import { withError } from '../../../containers'
import { defaultUpdateMutationConfig, formConfig } from '../../../services/driver'
import { Contact } from '../../../components/index'

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
    $set : {
      _id: params._id,
      contact: Utils.buildContact(params)
    }
  }
}
const mutationConfig = {
  ...defaultUpdateMutationConfig,
  paramsToDoc
}

ContactFormPanel = compose(
  withMutation(mutationConfig),
  withError(),
  withFormPanel({form: formConfig, panel: {edit: EditMode, view: ViewMode}}),
)(ContactFormPanel)

export { ContactFormPanel }
