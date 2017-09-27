import React, { PropTypes } from 'react'
import GoogleMap from 'google-map-react'
import _ from 'lodash'
import { Meteor } from 'meteor/meteor'

import { MapPlace, K_SIZE } from './MapPlace.js'


function createMapOptions (maps) {
  // next props are exposed at maps
  // "Animation", "ControlPosition", "MapTypeControlStyle", "MapTypeId",
  // "NavigationControlStyle", "ScaleControlStyle", "StrokePosition", "SymbolPath", "ZoomControlStyle",
  // "DirectionsStatus", "DirectionsTravelMode", "DirectionsUnitSystem", "DistanceMatrixStatus",
  // "DistanceMatrixElementStatus", "ElevationStatus", "GeocoderLocationType", "GeocoderStatus", "KmlLayerStatus",
  // "MaxZoomStatus", "StreetViewStatus", "TransitMode", "TransitRoutePreference", "TravelMode", "UnitSystem"
  return {
    mapTypeControlOptions: {
      position: maps.ControlPosition.TOP_RIGHT
    },
    mapTypeControl: true
  }
}

export class MapPanel extends React.Component {
  static defaultProps = {
    center: {lat: 42.2547107, lng: -89.2749023},
    zoom: 12,
    size: {
      height: '83vh',
    }
  }
  static propTypes = {
    zoom: PropTypes.number,
    hoverKey: PropTypes.string,
    clickKey: PropTypes.string,
  }


  constructor (props) {
    super(props)
  }


  onMapClick = (key, childProps) => {

    let {route, onEdit} = this.props

    let detailSelectedItem = {
      _id: route._id,
      detailId: childProps.detail._id,
      customer: childProps.detail.customer,
      position: childProps.detail.position
    }

    onEdit && onEdit(detailSelectedItem)
  }

  render () {

    let {route, centerPosition, size, center, zoom, hoverKey} = this.props
    let {details} = route || []

    if (!centerPosition && details && details.length > 0) {
      centerPosition = {
        lat: _.get(details, '[0].customer.contact.address1.gps.lat'),
        lng: _.get(details, '[0].customer.contact.address1.gps.lng')
      }
    }

    return (

      <div style={size}>
        <GoogleMap

          center={centerPosition || center}
          defaultZoom={zoom}
          options={createMapOptions}
          onChildClick={this.onMapClick}
          bootstrapURLKeys={{
            key: Meteor.settings.public.googleMapsApi,
            language: 'en',
          }}
          hoverDistance={K_SIZE / 2}>

          { details && details.map((m, i) => {
            const lat = _.get(m, 'customer.contact.address1.gps.lat')
            const long = _.get(m, 'customer.contact.address1.gps.lng')

            if (lat && long) {
              return <MapPlace key={i} lat={lat}
                               lng={long}
                               text={m.position.toString()}
                               detail={m}
                               hover={hoverKey === m._id}
              />
            }

          }) }

        </GoogleMap>
      </div>
    )
  };
}


