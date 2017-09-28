import React from 'react'
import { Label } from 'pcmli.umbrella.web-ui'

import { OrderStatusEnum } from '../../../../imports/api/order/helper'

export const OrderStatusLabel = ({status}) => {

  let type = 'success'
  if (status === OrderStatusEnum.processing)
    type = 'warning'
  else if (status === OrderStatusEnum.new)
    type = 'info'

  return (
    <Label type={type}>{status}</Label>
  )
}