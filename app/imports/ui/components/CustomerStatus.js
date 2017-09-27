import React from 'react'

import { CustomerModel } from '../../api/customer/model'


export const CustomerStatus = ({value, className}) => {

  let type = 'info'

  if (value === CustomerModel.status.inActive) {
    type = 'muted'
  }

  return (
    <span title={value} className={className}>
                    <i className={'fa fa-circle text-' + type  }/>
                    </span>
  )
}


CustomerStatus.defaultProps ={
  className : ''
}


