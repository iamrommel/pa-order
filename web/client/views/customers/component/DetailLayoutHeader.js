import React from 'react'
import { Icon, Label, } from 'pcmli.umbrella.web-ui'
import { CustomerStatus } from '../../../components/index'

export const DetailLayoutHeader = ({data = {}}) => {

  const {status, name, contact, type, title} = data

  return (
    <div style={{minHeight: '150px'}} className="m-l-lg m-b-lg">
      <h2 className="font-bold">
        <CustomerStatus value={status}/> {name} <br/>
        {title && <small className="m-l-lg">{title}</small>}
      </h2>
      <div className="m-l-lg">
        <p >
          {contact && contact.address1 && contact.address1.fullAddress &&
          <span><Icon name="map-marker"/> { contact && contact.address1 && contact.address1.fullAddress }
            <br/>
                    </span>}
          {contact && contact.phone && <span><Icon name="phone"/> {contact && contact.phone}<br/></span>}
          {contact && contact.email &&
          <a href={'mailto:' + contact.email }><Icon
            name="envelope"/> {contact && contact.email}<br/></a>}
        </p>

        <Label type="success">{type}</Label>
      </div>


    </div>
  )
}
