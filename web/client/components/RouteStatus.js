import React from 'react'
import { Utils } from 'pcmli.umbrella.core'
import { RouteModel } from '../../imports/api/route/model'

export const RouteStatus = (props) => {
  let {value, className} = props
  className = className || ''

  let type = 'info'

  if (value === RouteModel.status.inActive) {
    type = 'muted'
  }

  return (
    <span title={value} className={className}>
                    <i title={value} className={'fa fa-circle text-' + type  }/>
                    </span>
  )
}


