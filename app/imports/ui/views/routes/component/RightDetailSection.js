import React from 'react'
import _ from 'lodash'
import { Ibox, IboxContent, } from 'pcmli.umbrella.web-ui'

import { MapPanel } from './MapPanel'

export class RightDetailSection extends React.Component {


  render () {
    const {route, selectedRouteDetail} = this.props
    const lat = _.get(selectedRouteDetail, 'customer.contact.address1.gps.lat')
    const lng = _.get(selectedRouteDetail, 'customer.contact.address1.gps.lng')

    let centerPosition = null
    if (lat && lng)
      centerPosition = {
        lat,
        lng
      }

    return (
      <Ibox>
        <IboxContent >
          <MapPanel route={route} centerPosition={centerPosition} />
        </IboxContent>
      </Ibox>
    )

  }
}
