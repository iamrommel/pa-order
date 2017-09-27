import React from 'react'
import { Icon, Image, Label, AutoSelect, } from 'pcmli.umbrella.web-ui'

import { CustomerProfileImage } from './CustomerProfileImage'
import { CustomerStatus } from './CustomerStatus'

export const CustomerDisplay = ({value, showType}) => {

  const {logo, contact, status, name, type} = value || {}

  let renderType = null
  if (showType) {
    renderType = <Label className="pull-right" type="success">{type}</Label>
  }

  return (
    <div >
      <div style={{width: '40px', float: 'left'}}>
        <CustomerProfileImage value={logo}/>
      </div>
      <div >
        <h4>
          {renderType}
          <CustomerStatus value={status}/> {name} <br/>
          <small className="font-italic">
            <Icon name="map-marker"/> {contact && contact.address1 && contact.address1.fullAddress}
          </small>
        </h4>
      </div>
    </div>
  )
}


