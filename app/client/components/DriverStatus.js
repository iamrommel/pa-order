import React from 'react'
import { Icon, Image } from 'pcmli.umbrella.web-ui'
import { DriverModel } from '../../imports/api/driver/model'


const DriverStatus = (props) => {

  let {value, className} = props

  let type = 'info'

  if (value === DriverModel.status.inActive) {
    type = 'muted'
  }

  return (
    <span title={value} className={className}>
                    <i className={'fa fa-circle text-' + type  }/>
                    </span>
  )
}
DriverStatus.propTypes = {
  value: React.PropTypes.string,
  className: React.PropTypes.string,
}
DriverStatus.defaultProps = {
  className: ''
}

export { DriverStatus }
