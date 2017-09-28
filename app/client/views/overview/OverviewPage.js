import React from 'react'
import { Alert } from 'pcmli.umbrella.web-ui'
import { Page } from '../../components'

export const OverviewPage = () => {
  return (
    <Page>
      <Alert type="success">
        <h1>Welcome to Hauler Application</h1>
      </Alert>
    </Page>
  )
}

