import { PageFooter } from 'pcmli.umbrella.web-ui'
import React from 'react'

import { AppVersion } from './AppVersion'

export const Footer = () => {
  return <PageFooter appVersion={<AppVersion/>}/>
}


