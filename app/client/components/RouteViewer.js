import React from 'react'
import { Utils } from 'pcmli.umbrella.core'
import { BaseViewer, NothingToShow } from 'pcmli.umbrella.web-ui'

import { RouteDisplay } from './RouteDisplay'

export const RouteViewer = (props = {}) => {

  const renderContent = ({formViewer = {}}) => {
    let {value} = formViewer
    if (!value)
      return <NothingToShow message="No route defined yet."/>

    return <RouteDisplay value={value}/>
  }
  return <BaseViewer {...props} renderContent={renderContent}/>
}

