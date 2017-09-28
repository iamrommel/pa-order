import React from 'react'
import { FormSection, Field } from 'redux-form'
import { Well } from 'react-bootstrap'
import {AddressEditor, TextEditor, } from 'pcmli.umbrella.web-ui'


export class Contact extends FormSection {

  constructor (...args) {
    super(...args)

  }

  static defaultProps = {
    name: 'contact'
  }

  render () {

    return (
      <div>
        <Well>
          <h3 className="text-success">Contact</h3>
          <hr/>
          <Field name="email" label="E-mail" component={TextEditor}/>
          <Field name="phone" label="Phone" component={TextEditor}/>
        </Well>

        <FormSection name="address1">
          <AddressEditor/>
        </FormSection>
      </div>
    )
  }
}