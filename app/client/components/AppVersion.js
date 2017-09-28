import React from 'react'
import { AppVersion as AppV } from 'pcmli.umbrella.web-ui'

import { version } from '../../package.json'

export const AppVersion = () => {

  return (
    <AppV versionNumber={version}/>
  )
}

