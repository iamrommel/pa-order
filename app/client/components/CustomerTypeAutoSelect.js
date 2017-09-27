import React from 'react'
import WebUi from 'pcmli.umbrella.web-ui'
import { withProps, compose } from 'recompose'

import { CustomerModel } from '../../imports/api/customer/model'

function selectIcon (value) {
  let iconName = 'milk-box'

  if (value === CustomerModel.type.plant) {
    iconName = 'tank-wagon'
  }
  else if (value === CustomerModel.type.grainProducer) {
    iconName = 'tank'
  }

  return iconName

}

const innerOptionRenderer = ({option,}) => {
  return (
    <div>
      <div style={{float: 'left', marginRight: '10px'}}>
        <WebUi.Icon name={option.icon} className="fa-icon-sm"/>
      </div>
      <h5>{option.label}</h5>
    </div>
  )
}

const options = Object.values(CustomerModel.type).map((value) => {

  return {
    value,
    label: value,
    icon: selectIcon(value)
  }
})

export const CustomerTypeAutoSelect = compose(
  withProps({
    innerOptionRenderer,
    options,
    valueKey: 'value',
    labelKey: 'label'
  }),
)(WebUi.AutoSelect)

export const CustomerTypeAutoSelectEditor = (props) => {
  return <WebUi.AutoSelectEditor component={CustomerTypeAutoSelect} {...props} />
}


export const CustomerTypeAutoSelectViewer = (props) => {

  let {value, className} = props
  className = className || ''
  const extraClassName = 'fa-icon-sm'
  let iconName = selectIcon(value)
  let icon = <WebUi.Icon name={iconName} className={extraClassName}/>

  return (
    <div className={className}>
      <a className="btn btn-outline dim btn-success ">{icon} &nbsp; {value}
      </a>
    </div>
  )

}
