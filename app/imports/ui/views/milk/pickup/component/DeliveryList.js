import React from 'react'
import { Table, Image, Icon, DateViewer } from 'pcmli.umbrella.web-ui'
import { Utils } from 'pcmli.umbrella.core'
import _ from 'lodash'

import { EditDeliveryFormModal } from './DeliveryFormModal'

let Row = (props) => {

  let {customer, weight, timeStamp, _id, pickupId} = props
  const initialValues = {
    deliveries: {
      $: {
        customer, weight, timeStamp, _id, pickupId
      }
    },
    _id: pickupId,
    filter: {'deliveries._id': _id}
  }

  const customerLogo = _.get(customer, 'logo.default')
  const customerSummary = _.get(customer, 'summary')

  let weightWithUnit = Utils.formatNumber(weight) + ' lbs.'
  const modalTriggerComponent = <a><h4>{customerSummary}</h4></a>

  return (
    <tr>
      <td style={{width: '32px'}}>
        <Image url={customerLogo} className="img-circle img-sm"/>
      </td>
      <td>
        <EditDeliveryFormModal form={`deliveryForm${_id}`} initialValues={initialValues} triggerComponent={modalTriggerComponent}/>
        <div className="text-primary font-italic">
          <small><Icon name="truck"/>{weightWithUnit}</small>
        </div>
      </td>
      <td>
        <DateViewer value={timeStamp} includeTime/>
      </td>
    </tr>

  )
}

export const DeliveryList = (props) => {

  const {data, onEdit} = props

  let createRow = (m, i) => {
    return (
      <Row key={m._id || i} onEdit={onEdit} {...m}/>
    )
  }

  return (
    <Table className="table-space-small" dataArray={data} createRow={createRow}/>
  )
}