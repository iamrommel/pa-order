import React from 'react'
import { withDocument } from 'pcmli.umbrella.core'
import { DeliveryPanel } from './DeliveryPanel'
import { HeaderPanel } from './HeaderPanel'
import { ItemPanel } from './ItemPanel'
import { documentQueryConfig } from '../../../../services/pickup'

let DetailLayout = (props) => {

  const {item, loading} = props
  let {deliveries, details, _id} = item || []

  //inject the pickupId on each deliveries
  deliveries = deliveries && deliveries.map((m) => {
      let result = Object.assign({}, m, {pickupId: _id})
      return result
    })

  //inject the pickupId on each details
  details = details && details.map((m) => {
      let result = Object.assign({}, m, {pickupId: _id})
      return result
    })

  return (
    <div className="row">
      <div className="col-md-6">
        <HeaderPanel loading={loading} data={item}/>
      </div>
      <div className="col-md-6">
        <DeliveryPanel loading={loading} data={deliveries} pickup={item}/>
      </div>
      <div className="col-md-12">
        <ItemPanel loading={loading} data={details} pickup={item}/>
      </div>
    </div>
  )
}

DetailLayout = withDocument(documentQueryConfig())(DetailLayout)
export { DetailLayout }

