import React from 'react'
import { Icon, Image } from 'pcmli.umbrella.web-ui'
import {DriverStatus} from './DriverStatus'

const DriverViewer = (props) => {

  const {value} = props
  const {logo, contact, status, name} = value || {}

  return (
    <div>
      <div style={{width: '40px', float: 'left'}}>
        <Image url={logo && logo.default} className="img-circle img-sm"/>
      </div>
      <div>
        <h4>
          <DriverStatus value={status}/> {name} <br/>
          <small className="font-italic">
            <Icon name="map-marker"/> {contact && contact.address1 && contact.address1.fullAddress}
          </small>
        </h4>
      </div>
    </div>
  )
}

DriverViewer.propTypes = {
  value: React.PropTypes.shape({
    logo: React.PropTypes.shape({'default': React.PropTypes.string}),
    status: React.PropTypes.string,
    name: React.PropTypes.string,
    contact: React.PropTypes.shape({
      address1: React.PropTypes.shape({
        fullAddress: React.PropTypes.string
      })
    })
  }).isRequired,
}

export { DriverViewer }
