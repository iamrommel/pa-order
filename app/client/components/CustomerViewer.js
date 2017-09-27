import React from 'react'
import { Icon, Image, Label, AutoSelect, } from 'pcmli.umbrella.web-ui'
import { BaseViewer, NothingToShow } from 'pcmli.umbrella.web-ui'

import { CustomerDisplay} from './CustomerDisplay'

export const CustomerViewer = (props) => {

  const renderContent = ({formViewer = {}}) => {
    let {value} = formViewer
    if (!value)
      return <NothingToShow message="No customer defined yet."/>

    return <CustomerDisplay value={value}/>
  }
  return <BaseViewer {...props} renderContent={renderContent}/>
}


