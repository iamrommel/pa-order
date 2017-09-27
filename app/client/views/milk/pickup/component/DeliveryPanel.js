import React from 'react'
import { IboxTools, Ibox, IboxHeader, IboxContent, Spinner } from 'pcmli.umbrella.web-ui'
import { Utils } from 'pcmli.umbrella.core'

import { DeliveryList } from './DeliveryList'
import { AddDeliveryFormModal } from './DeliveryFormModal'

export const DeliveryPanel = ({loading, data, pickup = {}}) => {

  const initialValues = {
    deliveries: {
      $: {
        pickupId: pickup._id,
        _id: Utils.generateId(17),
        timeStamp: pickup.timeStamp,
        weight: 100,
      }
    },
    _id: pickup._id
  }

  let renderContent = <DeliveryList data={data}/>
  let toolContent = <AddDeliveryFormModal initialValues={initialValues} triggerIconName="plus"/>

  if (loading) {
    renderContent = <Spinner/>
    toolContent = null
  }

  return (
    <Ibox>
      <IboxHeader title="Deliveries">
        <IboxTools>
          {toolContent}
        </IboxTools>
      </IboxHeader>
      <IboxContent>
        {renderContent}
      </IboxContent>
    </Ibox>
  )

}
